import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/CheckLogin/isDotorlogin"; // confirm filename typo
import { Prescription } from "../../../models/prescription.model";
import { TryCatch } from "../../../utils/Error/ErrorHandler";
import { Staff } from "../../../models/Staff.model";
import { MedicalRequest } from "../../../models/MedicalRequest.model";
import Student from "../../../models/Student.model";
import { sendResponse } from "../../../utils/response";

// Interface for populated student
interface PopulatedStudent {
    _id: string;
    name: string;
    indexNumber: string;
    degree?: string;
    department?: string;
    photo?: string;
    isVerified?: boolean;
}

export const getDashBoard = TryCatch(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    /** =========================
     * 1. RECENT STUDENTS
     * ========================= */
    const recentStudents = await Student.find()
        .select("_id name degree indexNumber photo")
        .lean();

    const formattedStudentList = recentStudents.map(student => ({
        id: student._id,
        name: student.name,
        department: student.degree,
        emn: student.indexNumber,
        image: student.photo || "/images/default.jpg"
    }));

    /** =========================
     * 2. GENERAL COUNTS
     * ========================= */
    const [totalStudents, totalStaff, absentStaff, staffOnLeave, pendingMedicalRequests] = await Promise.all([
        Student.countDocuments({ isVerified: true }),
        Staff.countDocuments({ isVerified: true }),
        Staff.countDocuments({ isVerified: true, isAvailable: false, reason: "absent" }),
        Staff.countDocuments({ isVerified: true, isAvailable: false, reason: { $in: ["annual leave", "sick leave", "personal leave"] } }),
        MedicalRequest.countDocuments({ status: "approved" })
    ]);

    /** =========================
     * 3. NEXT MEDICAL APPOINTMENT (Nearest Future Schedule)
     * ========================= */
    const now = new Date();

    const nearestRequest = await MedicalRequest.findOne({
        status: "approved",
        schedule: { $gte: now }
    })
        .populate<{ studentId: PopulatedStudent }>("studentId", "_id photo indexNumber")
        .sort({ schedule: 1 })
        .lean();

    const nextPatient = nearestRequest && nearestRequest.studentId
        ? {
            id: nearestRequest.studentId._id,
            photo: nearestRequest.studentId.photo || "/images/default.jpg",
            indexNumber: nearestRequest.studentId.indexNumber,
            schedule: nearestRequest.schedule
        } : null



    /** =========================
     * 4. PATIENT CHART DATA FROM PRESCRIPTIONS
     * ========================= */
    const prescriptionPatients = await Prescription.find()
        .populate<{ studentId: PopulatedStudent }>(
            "studentId",
            "_id name degree indexNumber photo isVerified"
        )
        .lean();

    const verifiedPatients = prescriptionPatients.filter(p => p.studentId?.isVerified);

    const deptMap = new Map<string, Set<string>>();
    verifiedPatients.forEach(p => {
        const rawDegree = p.studentId.degree || "Unknown";
        const degreeMap: Record<string, string> = {
            ICT: "Information Communication",
            BBST: "BIO system technology",
            BET: "Engineering Technology",
            CST: "Computer Science and Technology",
            AQL: "Aquaculture Technology"
        };
        const key = Object.keys(degreeMap).find(k =>
            k.toLowerCase() === rawDegree.toLowerCase() ||
            degreeMap[k].toLowerCase() === rawDegree.toLowerCase()
        );
        const normalizedDegree = key ? degreeMap[key] : rawDegree;

        if (!deptMap.has(normalizedDegree)) deptMap.set(normalizedDegree, new Set());
        deptMap.get(normalizedDegree)!.add(p.studentId._id.toString());
    });

    const departmentMap: Record<string, string> = {
        "Information Communication": "ICT",
        "Engineering Technology": "BET",
        "BIO system technology": "BBST",
        "Aquaculture Technology": "AQL",
        "Computer Science and Technology": "CST",
        "Unknown": "Unknown"
    };

    const patientData = Array.from(deptMap.entries()).map(([dept, students]) => ({
        name: departmentMap[dept] || dept,
        value: students.size
    }));

    /** =========================
     * 5. WEEKLY PATIENT VISITS
     * ========================= */
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weeklyVisits = await MedicalRequest.aggregate([
        { $match: { createdAt: { $gte: weekStart, $lte: weekEnd } } },
        { $group: { _id: { $dayOfWeek: "$createdAt" }, count: { $sum: 1 } } },
        { $project: { dayNumber: "$_id", patients: "$count", _id: 0 } }
    ]);

    const weeklyData = Array.from({ length: 7 }, (_, i) => {
        const dayIndex = (i + 1) % 7;
        const mongoDay = dayIndex === 0 ? 1 : dayIndex + 1;
        const dayData = weeklyVisits.find(d => d.dayNumber === mongoDay);
        return { day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i], patients: dayData ? dayData.patients : 0 };
    });

    /** =========================
     * 6. STUDENT INCREASE STATISTICS
     * ========================= */
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setHours(0, 0, 0, 0);

    const studentsLastMonth = await Student.countDocuments({
        isVerified: true,
        createdAt: { $gte: lastMonth }
    });

    const studentIncrease = studentsLastMonth;

    /** =========================
     * 7. FINAL RESPONSE
     * ========================= */
    const dashboardStats = {
        studentCount: totalStudents,
        studentIncrease,
        staffCount: totalStaff,
        staffAbsent: absentStaff,
        staffLeave: staffOnLeave,
        medicalRequests: pendingMedicalRequests,
        nextMedicalTime: nextPatient?.schedule || "No appointments"
    };

    sendResponse(res, 200, true, "Dashboard data retrieved successfully", {
        studentList: formattedStudentList,
        patientData,
        weeklyData,
        nextPatient,
        dashboardStats
    });
});
