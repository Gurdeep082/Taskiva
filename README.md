# Taskiva

Taskiva is a modern MERN stack-based task management and productivity platform designed to simplify workflow organization, task assignment, and collaboration between users. The application provides secure authentication, role-based dashboards, AI-powered assistance, and efficient task tracking features.

---

# Features

* User Authentication & Authorization
* Role-Based Dashboards (Admin, Client, Tasker)
* Task Creation & Management
* Protected Routes using JWT
* AI Assistant Integration
* Responsive User Interface
* REST API Architecture
* MongoDB Database Integration

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* React Icons
* CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Token)

## AI Integration

* Google Generative AI API
* OpenAI API

## Development Tools

* VS Code
* GitHub
* Postman

---

# Project Structure

```bash
taskiva/
│
├── client/              # React Frontend
│   ├── src/
│   ├── components/
│   ├── dashboards/
│   ├── pages/
│   └── context/
│
├── server/              # Node.js Backend
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── package.json
└── README.md
```

---

# Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/taskiva.git
cd taskiva
```

---

# Backend Setup

## 2. Navigate to Server Folder

```bash
cd server
```

## 3. Install Backend Dependencies

```bash
npm install
```

## 4. Create `.env` File

Create a `.env` file inside the `server` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

## 5. Start Backend Server

```bash
npm start
```

Backend server will run on:

```bash
http://localhost:5000     https://taskiva-1.onrender.com
```

---

# Frontend Setup

## 6. Navigate to Client Folder

```bash
cd client
```

## 7. Install Frontend Dependencies

```bash
npm install
```

## 8. Start React Frontend

```bash
npm run dev
```

Frontend application will run on:

```bash
http://localhost:5173
```

---

# API Routes

## Authentication Routes

```bash
/api/auth
```

## Dashboard Routes

```bash
/ api/dashboard
```

## AI Routes

```bash
/ api/ai
```

---

# Main Functionalities

## Admin Dashboard

* Manage users
* Monitor tasks
* View workflow data

## Client Dashboard

* Create and assign tasks
* Monitor project progress

## Tasker Dashboard

* View assigned tasks
* Update task progress

## AI Assistant

* Generate intelligent responses
* Improve productivity and workflow assistance

---

# Database Collections

## Users Collection

Stores user information:

* Name
* Email
* Password
* Role

## Tasks Collection

Stores task information:

* Title
* Description
* Status
* Assigned User
* Deadline

---

# Security Features

* JWT Authentication
* Protected Routes
* Secure API Access
* Environment Variable Protection

---

# Future Improvements

* Real-time Notifications
* Team Chat System
* Mobile Application
* Advanced AI Automation
* Real-time Collaboration Tools
* File Upload System

---

# Screenshots

Add project screenshots here:

* Home Page
* Login Page
* Dashboard
* Task Management Interface
* AI Assistant

---

# Challenges Faced

* Managing role-based authentication
* API integration handling
* Frontend-backend communication
* MongoDB connection issues
* React routing conflicts

---

# Conclusion

Taskiva demonstrates the implementation of a scalable and modern MERN stack application for task and workflow management. The project combines frontend development, backend APIs, database management, authentication systems, and AI integration into a centralized productivity platform.

---

# References

* React.js Documentation
* Node.js Documentation
* Express.js Documentation
* MongoDB Documentation
* Mongoose Documentation
* JWT Documentation
* Google Generative AI Documentation
* OpenAI API Documentation

---

# Author

Developed by: Gurdeep Singh

---
