import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin";
import { Prescription } from "../../../models/prescription.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { Staff } from "../../../models/Staff.model";
import { MedicalRequest } from "../../../models/MedicalRequest.model";
import Student from "../../../models/Student.model";
import { DayDate } from "../../../models/DayData.model";
import { sendResponse } from "../../../utils/response";

// Type for populated medical request
interface PopulatedMedicalRequest {
    studentId: {
        name: string;
        indexNumber: string;
        photo?: string;
    };
    schedule: Date;
    status: string;
}

export const getDashBoard = TryCatch(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const doctor = req.user;

    // === Student List Data ===
    const studentList = await Student.find(/*{ isVerified: true }*/)
        .select('name department indexNumber photo')
        .limit(4)
        .lean();

    const formattedStudentList = studentList.map(student => ({
        name: student.name,
        department: student.department,
        emn: student.indexNumber,
        image: student.photo || '/images/default.jpg'
    }));

    // === Dashboard Stats ===
    const totalStudents = await Student.countDocuments({ isVerified: true });
    const totalStaff = await Staff.countDocuments({ isVerified: true });
    const absentStaff = await Staff.countDocuments({
        isVerified: true,
        isAvailable: false,
        reason: 'absent'
    });
    const staffOnLeave = await Staff.countDocuments({
        isVerified: true,
        isAvailable: false,
        reason: { $in: ['annual leave', 'sick leave', 'personal leave'] }
    });
    const pendingMedicalRequests = await MedicalRequest.countDocuments({ status: 'pending' });

    // Get next medical appointment
    const nextAppointment = await MedicalRequest.findOne({
        status: 'approved',
        schedule: { $gte: new Date() }
    })
        .populate('studentId', 'name indexNumber photo')
        .sort({ schedule: 1 }) as PopulatedMedicalRequest | null;

    const nextMedicalTime = nextAppointment
        ? nextAppointment.schedule.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        : null;

    // === Donut Chart Data (Patient data by department) ===
    // Get actual patients from prescriptions and group by department (count unique students)
    const prescriptionPatients = await Prescription.aggregate([
        {
            $lookup: {
                from: 'students',
                localField: 'studentId',
                foreignField: '_id',
                as: 'student'
            }
        },
        {
            $unwind: '$student'
        },
        {
            $match: {
                'student.isVerified': true
            }
        },
        {
            $group: {
                _id: {
                    department: '$student.department',
                    studentId: '$studentId'
                }
            }
        },
        {
            $group: {
                _id: '$_id.department',
                uniquePatients: { $sum: 1 }
            }
        },
        {
            $project: {
                department: '$_id',
                value: '$uniquePatients',
                _id: 0
            }
        }
    ]);

    // Map department names to abbreviations for the chart
    const departmentMap: { [key: string]: string } = {
        'Information Communication': 'ICT',
        'Engineering Technology': 'ET',
        'Environmental Technology': 'ENM',
        'Aquaculture Technology': 'AQT',
        'BIO system technology': 'BST'
    };

    const patientData = prescriptionPatients.map(dept => ({
        name: departmentMap[dept.department] || dept.department,
        value: dept.value
    }));

    // === Bar Chart Data (Weekly patient visits) ===
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of current week
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weeklyVisits = await MedicalRequest.aggregate([
        {
            $match: {
                createdAt: { $gte: weekStart, $lte: weekEnd },
                status: { $in: ['approved', 'pending'] }
            }
        },
        {
            $group: {
                _id: { $dayOfWeek: "$createdAt" },
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                dayNumber: "$_id",
                patients: "$count",
                _id: 0
            }
        }
    ]);

    // Map day numbers to day names (MongoDB $dayOfWeek: 1=Sunday, 2=Monday, etc.)
    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData = Array.from({ length: 7 }, (_, i) => {
        // Reorder to start with Monday (i=0 -> Monday, i=6 -> Sunday)
        const dayIndex = (i + 1) % 7; // 0->1(Mon), 1->2(Tue), ..., 6->0(Sun)
        const mongoDay = dayIndex === 0 ? 1 : dayIndex + 1; // Convert to MongoDB numbering
        const dayData = weeklyVisits.find(d => d.dayNumber === mongoDay);
        return {
            day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
            patients: dayData ? dayData.patients : 0
        };
    });

    // Calculate student increase (compare with last month)
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const studentsLastMonth = await Student.countDocuments({
        isVerified: true,
        createdAt: { $lt: lastMonth }
    });
    const studentIncrease = totalStudents - studentsLastMonth;

    const dashboardStats = {
        studentCount: totalStudents,
        studentIncrease: Math.max(0, studentIncrease),
        staffCount: totalStaff,
        staffAbsent: absentStaff,
        staffLeave: staffOnLeave,
        medicalRequests: pendingMedicalRequests,
        nextMedicalTime: nextMedicalTime || "No appointments"
    };

    const nextPatient = nextAppointment ? {
        name: nextAppointment.studentId.name,
        id: nextAppointment.studentId.indexNumber,
        imageUrl: nextAppointment.studentId.photo || '/images/default.jpg'
    } : null;

    const dashboardData = {
        studentList: formattedStudentList,
        patientData: patientData,
        weeklyData: weeklyData,
        nextPatient: nextPatient,
        dashboardStats: dashboardStats
    };

    sendResponse(res, 200, true, "Dashboard data retrieved successfully", dashboardData);
});
