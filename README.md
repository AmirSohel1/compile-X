# 🚀 CompileX - Online Code Execution Engine

**CompileX** is a full-stack, real-time **online code editor and compiler** platform that allows users to write, run, and test code in multiple programming languages directly from their browsers. It supports languages like **C, C++, Java, Python**, and more — powered by a secure backend execution engine.

---

## 📌 Features

- ✅ **Multi-language Support** (C, C++, Java, Python, etc.)
- 🎯 **Real-Time Code Compilation**
- 🧪 **Custom Input Support**
- 📦 **Secure Sandboxed Execution**
- 📒 **Personalized Notebook Feature**
- 🌐 **REST API** for integration with other applications
- 💻 Built using **React, Node.js, Express, MongoDB**

---

## 📸 Screenshots

### 🖊️ Code Editor

![Editor](./frontend/assets/1.png)

### 🖥️ Login/SignUP

![Output](./frontend/assets/2.png)

### 📒 Personalized Notebook

![Notebook](./frontend/assets/3.png)

## 🛠 Tech Stack

| Frontend      | Backend    | Execution Engine          | Others             |
| ------------- | ---------- | ------------------------- | ------------------ |
| React         | Node.js    | Judge0 / Docker           | Axios              |
| Bootstrap/CSS | Express.js | Vercel (Frontend Hosting) | VS Code (Dev Tool) |

---

## 🧠 How It Works

1. User writes code in the browser.
2. Code, language ID, and optional input are sent via Axios to the backend.
3. Backend securely compiles the code using Docker or Judge0 API.
4. Output or errors are returned and shown on the frontend.
5. Users can also **log in / sign up** to access a **personalized coding notebook** to save code and notes.

---

## 🧾 Installation & Setup

### 📥 Clone the Repository

```bash
git clone https://github.com/AmirSohel1/compilex.git
cd compilex

### ⚙️ Create a .env file in the root and add:

JUDGE0_URL=your_judge0_api_url
JUDGE0_HOST=your_judge0_host
JUDGE0_KEY=your_judge0_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

## 🚀 Start the Backend Server
cd backend
npm install
nodemon index.js

## 🌐 Start the Frontend App
cd frontend
npm install
npm run dev
```
