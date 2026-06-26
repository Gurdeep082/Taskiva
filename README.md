# 🚀 Taskiva - AI Powered Gig Marketplace

Taskiva is a full-stack MERN application that connects customers with skilled service providers through a modern, AI-assisted platform. Users can post tasks, browse professionals, manage bookings, and communicate seamlessly, while administrators oversee the entire system through a centralized dashboard.

---

## ✨ Features

### 👤 User Authentication

* Secure JWT Authentication
* User Registration & Login
* Role-based Access (User, Tasker, Admin)
* Protected Routes

### 📋 Task Management

* Create Tasks
* Edit Tasks
* Delete Tasks
* View Task Details
* Task Categories
* Task Status Tracking

### 👷 Tasker Module

* Tasker Registration
* Public Tasker Profiles
* Skills & Experience
* Portfolio Upload
* Availability Management

### 🤖 AI Assistant

* AI-powered chatbot
* Task recommendation assistance
* User support
* Smart responses for common queries

### 💬 Communication

* Contact Forms
* Notifications
* Real-time user interaction

### 📊 Admin Dashboard

* Manage Users
* Manage Taskers
* Manage Tasks
* Website Analytics
* Dashboard Statistics
* System Monitoring

### 🎨 Modern UI

* Fully Responsive Design
* Mobile Friendly
* Clean User Interface
* Smooth Animations
* Fast Navigation

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* CSS3
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Deployment

* Netlify (Frontend)
* Render (Backend)

---

# 📂 Project Structure

```
Taskiva
│
├── client
│   ├── public
│   ├── src
│   ├── components
│   ├── pages
│   ├── assets
│   └── App.js
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/taskiva.git
```

Move into the project

```bash
cd taskiva
```

---

## Install Client

```bash
cd client
npm install
```

---

## Install Server

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:3000

GEMINI_API_KEY=your_api_key
```

---

# ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### Start Frontend

```bash
cd client
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🔄 How It Works

1. User creates an account and logs in.
2. Customers can post service requests or browse available taskers.
3. Taskers register and complete their professional profiles.
4. Users select a tasker or apply for available tasks.
5. The AI Assistant helps users find services, answer questions, and improve the experience.
6. Admin manages users, taskers, tasks, and website analytics through the dashboard.

---

# Future Improvements

* Real-time Chat
* Payment Gateway Integration
* Reviews & Ratings
* Push Notifications
* Google Maps Integration
* Video Calling
* AI Task Matching
* Recommendation System
* Mobile Application

---

# Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

# License

This project is licensed under the MIT License.

---

# Author

**Gurdeep Singh**

Full Stack Developer | MERN Stack Developer

If you found this project useful, consider giving it a ⭐ on GitHub.
