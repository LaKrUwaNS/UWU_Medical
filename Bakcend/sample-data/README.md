# UWU Medical Dashboard - Sample Data

This folder contains sample data for testing the UWU Medical Dashboard API.

## 📁 Files Included

### Individual Collection Files:
- `students.json` - 6 sample students from different departments
- `staff.json` - 3 staff members with various availability statuses
- `doctors.json` - 1 sample doctor
- `medicalrequests.json` - 5 medical requests with different statuses
- `prescriptions.json` - 5 prescriptions linking students to treatments
- `medicines.json` - 3 sample medicines
- `inventories.json` - 3 inventory records

### Import Script:
- `import-data.ps1` - PowerShell script to import all collections

## 🚀 How to Import Data

### Method 1: Using PowerShell Script (Recommended)
1. Open PowerShell in this directory
2. Run the import script:
   ```powershell
   .\import-data.ps1
   ```

### Method 2: Manual Import
Replace `uwu_medical` with your actual database name:

```powershell
mongoimport --db uwu_medical --collection students --file students.json --jsonArray --drop
mongoimport --db uwu_medical --collection staff --file staff.json --jsonArray --drop
mongoimport --db uwu_medical --collection doctors --file doctors.json --jsonArray --drop
mongoimport --db uwu_medical --collection medicalrequests --file medicalrequests.json --jsonArray --drop
mongoimport --db uwu_medical --collection medicines --file medicines.json --jsonArray --drop
mongoimport --db uwu_medical --collection inventories --file inventories.json --jsonArray --drop
mongoimport --db uwu_medical --collection prescriptions --file prescriptions.json --jsonArray --drop
```

## 🎯 Expected Dashboard Results

After importing this data, your dashboard API will return:

### Student List:
- 4 students from different departments (ICT, BST, ET, ENM, AQT)

### Patient Data (Donut Chart):
- ICT: 2 patients
- ET: 1 patient  
- BST: 1 patient
- AQT: 1 patient

### Dashboard Stats:
- Total Students: 6
- Total Staff: 3
- Staff Absent: 1
- Staff on Leave: 1
- Pending Medical Requests: 1
- Next Medical Time: 14:30

### Weekly Data:
- Based on medical request creation dates
- Shows patient visits throughout the week

### Next Patient:
- Nirmal Perera (UWU/ICT/22/001) scheduled for 14:30

## 🔗 Testing Your API

After importing the data, test your dashboard endpoint:
```
GET http://localhost:your_port/api/doctor/dashboard
```

## 📝 Notes

- All passwords are hashed using bcrypt
- ObjectIds are properly formatted for MongoDB
- Dates use proper MongoDB date format
- All relationships between collections are maintained
- Data includes realistic scenarios for comprehensive testing

## 🗂️ Data Relationships

- **Students** → Referenced in **Prescriptions** and **MedicalRequests**
- **Doctors** → Referenced in **Prescriptions**
- **Medicines** → Referenced in **Prescriptions** and **Inventories**
- **Inventories** → Referenced in **Prescriptions**

This ensures your aggregation queries will work correctly and return meaningful data for the dashboard.
