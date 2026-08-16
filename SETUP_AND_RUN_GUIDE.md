# Cancer Detection System - Setup & Run Guide (React + Node.js + Express + MongoDB)

## Technology Stack
- **Frontend**: React 19 + Vite + TypeScript + Tailwind CSS
- **Backend API**: Node.js + Express.js (REST API)
- **Database**: MongoDB (Mongoose ORM)
- **ML / AI Engine**: Python 3.8+ (DenseNet121 Flask Microservice)

---

## Prerequisites
- Node.js 18+
- MongoDB installed locally or MongoDB Atlas Connection String
- Python 3.8+ (for local AI inference server)

---

## Step 1: Install Dependencies

### 1. Frontend & Root Dependencies
```bash
npm install
```

### 2. Node.js Express Server Dependencies
```bash
cd server
npm install
```

### 3. Python AI Backend Dependencies (Optional - for running model server locally)
```bash
pip install tensorflow numpy opencv-python flask flask-cors pillow albumentations requests
```

---

## Step 2: Environment Setup

### Create `.env` in `server/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cancer_detection
JWT_SECRET=your_jwt_secret_key_here
```

---

## Step 3: Run the Services

### 1. Start MongoDB Backend Server (Port 5000)
```bash
cd server
node server.js
```

### 2. Start Frontend React + Vite Server (Port 3000)
In a new terminal window:
```bash
npm run dev
```

### 3. Start Python AI Model Server (Port 5000 / Render)
In a new terminal window:
```bash
python scripts/cervix-model-api.py
```

---

## API & Database Endpoints
- **REST Base API**: `http://localhost:5000/api`
- **Auth Routes**: `http://localhost:5000/api/auth/register`, `/login`
- **MongoDB Models**: `Patient`, `User`, `Hospital`, `Analysis`
