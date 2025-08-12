# University Medical Center Project

## Overview

The **University Medical Center** project is a healthcare management system designed to streamline operations for a university-affiliated medical center. It enables doctors, staff, and patients to manage appointments, medical records, prescriptions, and communication efficiently within a secure and user-friendly platform.

## Features

- **Doctor Module**  
  - Profile and settings management  
  - Access to patient medical records  
  - Prescription creation and management  

- **Patient Module**  
  - Appointment booking and management  
  - Prescription viewing and downloading  
  - Personal health record access  

- **Staff Module**  
  - Handling medical requests  
  - Data administration and reporting  

- **Admin Module**  
  - User management  
  - System monitoring and configuration  

## Technology Stack

- Backend: Node.js, Express.js  
- Database: MongoDB  
- Frontend: React.js  
- Authentication: JWT / Session-based  
- File Storage: Cloudinary (for image uploads)  
- Middleware: Custom authentication and error handling

## API Endpoints

- `GET /doctor/settings` - Retrieve doctor profile data  
- `PATCH /doctor/settings` - Update doctor profile including image upload  
- [Add other endpoints as needed]

## Installation

### Prerequisites

- Node.js (v14 or higher)  
- MongoDB instance  
- Cloudinary account for image uploads

### Setup Steps

1. Clone the repository  
   ```bash
   git clone https://github.com/yourusername/university-medical-center.git
