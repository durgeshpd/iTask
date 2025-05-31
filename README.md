# iTask — Task Management System

iTask is a modern and minimal task management system that allows users to create, update, and track their tasks easily. It features a clean UI, secure authentication, and a robust backend API.

---

## 🔗 Live Project

➡️ [Visit iTask](http://51.21.190.33/itask/)

This will take you directly to the login page of the deployed iTask platform.

---

## 🚀 Features

- ✅ User authentication with JWT
- 📋 Add, update, delete, and view tasks
- 🌐 REST API built with Node.js and Express
- ⚡ Fast frontend using React + Vite
- ☁️ MongoDB Atlas for data storage
- 🎨 Styled using Tailwind CSS + DaisyUI

---

## 🛠️ Tech Stack

| Layer     | Stack                              |
|-----------|-------------------------------------|
| Frontend  | React, Vite, Tailwind CSS, DaisyUI |
| Backend   | Node.js, Express.js                |
| Database  | MongoDB (Mongoose)                 |
| Auth      | JWT (JSON Web Tokens)              |

---

## 📁 Project Structure

iTask/
├── iTask-backend/ # Node.js + Express backend
├── iTask-frontend/ # React + Vite frontend
└── README.md # Project overview


---

## ⚙️ Getting Started

1. Clone the Repo

```bash
git clone <your-repo-url>
cd iTask

2. Backend Setup (iTask-backend)

cd iTask-backend
npm install

Create a .env file:

MONGO_URI=your_mongodb_uri
PORT=3000
JWT_SECRET=your_jwt_secret

Start the server:

npm start

3. Frontend Setup (iTask-frontend)

cd ../iTask-frontend
npm install
npm run dev

This will start the React app on http://localhost:5173 (or similar).


📬 Contact
Feel free to open an issue or submit a pull request if you have ideas or improvements.

Built with ❤️ using Node.js, React and MongoDB