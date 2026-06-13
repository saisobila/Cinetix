# Cinetix Movie Ticket Booking App (MERN Stack)

## 📌 Project Overview
This is a **Movie Ticket Booking Application** developed using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). The application allows users to browse movies, select seats, and book tickets seamlessly.

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Styling:** CSS/Bootstrap (if used)

---

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```bash
https://github.com/saisobila/Cinetix
cd cinetix
```

### 2️⃣ Install Dependencies
#### Backend Setup
```bash
cd backend
npm install
```
#### Frontend Setup
```bash
cd ../frontend
npm install
```

### 3️⃣ Configure Environment Variables
- Create a `.env` file inside the `backend` folder and add the required environment variables.
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Application
#### Start Backend Server
```bash
cd backend
npm start
```
#### Start Frontend Server
```bash
cd frontend
npm start
```

The application will now be accessible at `http://localhost:3000`.

---

## 🎬 Features
✅ User authentication (Login/Signup)  
✅ Browse available movies  
✅ Select seats and book tickets  
✅ Secure payment integration (if applicable)  
✅ Admin panel for managing movies and bookings  

---

## 📁 Project Structure
```
cinetix/
│── backend/
│   ├── config/         # Configuration files
│   ├── controller/     # Business logic controllers
│   ├── middleware/     # Middleware for authentication, validation, etc.
│   ├── model/          # Mongoose models (User, Movie, Booking, etc.)
│   ├── route/          # Express API routes
│   ├── utils/          # Utility functions
│   ├── server.js       # Main backend server
│   ├── package.json    # Backend dependencies
│
│── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── App.js      # Main React component
│   │   ├── index.js    # React entry point
│   ├── package.json    # Frontend dependencies
│
└── README.md           # Project documentation
```

---

.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
