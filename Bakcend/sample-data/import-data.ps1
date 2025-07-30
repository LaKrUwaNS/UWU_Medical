# PowerShell MongoDB Import Commands
# Navigate to the sample-data directory first: cd sample-data
# Replace 'uwu_medical' with your actual database name

Write-Host "Starting MongoDB data import..." -ForegroundColor Green

# Import Students
Write-Host "Importing students..." -ForegroundColor Yellow
mongoimport --db uwu_medical --collection students --file students.json --jsonArray --drop

# Import Staff  
Write-Host "Importing staff..." -ForegroundColor Yellow
mongoimport --db uwu_medical --collection staff --file staff.json --jsonArray --drop

# Import Doctors
Write-Host "Importing doctors..." -ForegroundColor Yellow
mongoimport --db uwu_medical --collection doctors --file doctors.json --jsonArray --drop

# Import Medical Requests
Write-Host "Importing medical requests..." -ForegroundColor Yellow
mongoimport --db uwu_medical --collection medicalrequests --file medicalrequests.json --jsonArray --drop

# Import Medicines
Write-Host "Importing medicines..." -ForegroundColor Yellow
mongoimport --db uwu_medical --collection medicines --file medicines.json --jsonArray --drop

# Import Inventories
Write-Host "Importing inventories..." -ForegroundColor Yellow
mongoimport --db uwu_medical --collection inventories --file inventories.json --jsonArray --drop

# Import Prescriptions
Write-Host "Importing prescriptions..." -ForegroundColor Yellow
mongoimport --db uwu_medical --collection prescriptions --file prescriptions.json --jsonArray --drop

Write-Host "Sample data imported successfully!" -ForegroundColor Green
Write-Host "You can now test your dashboard API at: GET /api/doctor/dashboard" -ForegroundColor Cyan
