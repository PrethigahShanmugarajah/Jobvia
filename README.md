# 💼 Jobvia

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-blue?logo=tailwindcss)](https://tailwindcss.com/)

---

## 💼 About Jobvia

**Jobvia** is a full-stack **Job Portal Platform** built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js).**

It connects candidates and recruiters through a centralized platform where candidates can discover job opportunities, apply for positions, and manage their applications, while recruiters can manage job postings, companies, and applications.

The platform includes a dedicated admin panel for managing users, jobs, companies, recruiters, and applications.

This project focuses on:

- Job searching and filtering
- Candidate and recruiter management
- Secure authentication and authorization
- Resume uploads and job applications
- Company profiles and job management
- Role-based access control
- Responsive user interfaces
- Centralized administration

A portfolio-ready full-stack web application designed to simplify the recruitment process.

---

## ✨ Features

### 👤 Candidate Features (Client)

- Browse and search for job opportunities
- Filter jobs based on relevant criteria
- View job details
- Apply for jobs
- Upload and manage resumes
- Explore company profiles
- Browse company-related questions
- Explore role-related questions
- Save jobs and track applications
- Manage candidate profiles
- Secure authentication
- Responsive user interface

---

### 🏢 Recruiter Features

- Manage recruiter accounts
- Create and manage job postings
- Manage company profiles
- View job applicants
- Review candidate applications
- Manage recruitment activities

---

### 🛠 Admin Features

- Admin dashboard
- Manage users and recruiters
- Manage job postings
- Manage companies
- Manage company-related questions
- Manage role-related questions
- View and manage applicants
- Monitor platform activities

---

### 🔐 Authentication & Security

- JWT-based authentication
- Secure login and registration
- Email OTP verification
- Password recovery and reset
- Role-based access control
- Protected routes and API endpoints

---

## 🛠️ Technologies Used

### Frontend (Client & Admin)

- React.js
- Vite
- Tailwind CSS
- JavaScript
- Axios
- React Router DOM
- React Toastify
- Lucide React

### Backend (Server)

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST APIs
- Brevo Email Services

### Development Tools

- Git
- GitHub
- Postman
- Visual Studio Code
- ESLint

---

## ⚙️ How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/PrethigahShanmugarajah/Jobvia.git
cd Jobvia
```

### 2. Backend Setup (Server)

```bash
cd Server
npm install
npm run server
```

### 3. Client Setup

Open a new terminal:

```bash
cd Client
npm install
npm run dev
```

### 4. Admin Setup

Open another terminal:

```bash
cd Admin
npm install
npm run dev
```

---

## 🔑 Environment Variables

Configure the environment variables required by each application before running the project.

### 📂 Server (.env)

```env
PORT=
MONGODB_URI=
PROJECT_NAME=
OTP_TTL_MINUTES=
BREVO_API_KEY=
SENDER_EMAIL=
JWT_SECRET=
JWT_SECRET_EXPIRES_IN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLINT_URL=
ADMIN_URL=
```

### 📂 Client (.env)

```env
VITE_CURRENCY=
VITE_BASEURL=
VITE_CONTACT_EMAIL=
VITE_CONTACT_PHONE=
VITE_CONTACT_LOCATION=
VITE_PORTFOLIO_URL=
VITE_STORAGE_KEY=
VITE_STORAGE_JOBS_KEY=
VITE_STORAGE_APPLIED_KEY=
VITE_STORAGE_QUESTIONS_KEY=
```

### 📂 Admin (.env)

```env
VITE_BASEURL=
VITE_CURRENCY=
```

> **Note:** These are example placeholders. Verify the environment variables used by your actual Server, Client, and Admin code, and add any missing variables. Never commit real credentials or secret keys to GitHub.

---

## 👨‍💻 Author

**Prethigah Shanmugarajah (2020/2021)** </br>
Department of Software Engineering </br>
Faculty of Computing </br>
Sabaragamuwa University of Sri Lanka </br>

---
