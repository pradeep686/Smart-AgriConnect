#🌾 SMART-AGRICONNECT

![image](https://github.com/user-attachments/assets/266c5c1c-7efa-464a-b48e-04c942140009)

A unified digital platform designed to empower farmers through technology, providing tools for subsidy navigation, crop recommendations, digital marketplaces, farm management, and community engagement.

---

## 📌 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [API Endpoints](#-api-endpoints)
- [License](#-license)

---

## 🌾 Problem Statement

| Challenge                  | Impact                             |
|----------------------------|------------------------------------|
| Unclear subsidy information | Farmers miss financial benefits    |
| No crop demand data        | Oversupply leading to low prices   |
| Fragmented knowledge sharing | Limited access to expert advice  |
| Manual trading processes   | Inefficient market access          |
| Outdated farm practices    | Reduced productivity               |

---

## 💡 Solution

**Five Integrated Modules:**

1. **Subsidy Navigator** - Real-time government scheme tracking  
2. **Crop Oracle** - AI-powered planting recommendations  
3. **AgriMarket** - Digital trading with escrow  
4. **Farm Genius** - IoT-ready management system  
5. **Krishi Community** - Verified expert Q&A platform  

---

## 🛠 Tech Stack

### Frontend

- **React 18+**: Component-based UI  
- **Vite**: Fast build tool  
- **Tailwind CSS**: Utility-first styling  
- **Axios**: HTTP requests  
- **React Router**: Navigation  

### Backend

- **Node.js 16+**: Runtime environment  
- **Express**: Web framework  
- **Mongoose**: MongoDB ORM  
- **JWT**: Authentication  
- **Cloudinary**: Media storage  

### DevOps

- **Docker**: Containerization  
- **GitHub Actions**: CI/CD pipelines  
- **ESLint**: Code quality  
- **Prettier**: Code formatting  

---

## 📂 Project Structure

# SMART-AGRICONNECT 🌱

```plaintext
SMART-AGRICONNECT/
│
├── admin/
│   ├── node_modules/
│   ├── public/
│   │   ├── assets/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── subsidyController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Subsidy.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── apiRoutes.js
│   ├── utils/
│   │   ├── cloudinary.js
│   │   └── jwt.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── user/
│   ├── node_modules/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
```

# ✨ Features

- **Admin Portal**: User management and analytics  
- **Farmer Dashboard**: Integrated farming modules  
- **API Services**: Secure REST endpoints  
- **Database**: MongoDB with optimized schemas  

---

# 🛠 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **Authentication**: JWT  
- **Media Storage**: Cloudinary  


---



## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/yourusername/SMART-AGRICONNECT.git

# Install dependencies
cd SMART-AGRICONNECT/backend && npm install
cd ../frontend && npm install
cd ../admin && npm install

# Start development servers

# Backend
cd ../backend && npm start

# Frontend (in new terminal)
cd ../frontend && npm run dev

# Admin (in new terminal)
cd ../admin && npm run dev


- 🧩 New feature development  
- 🐛 Bug fixes  
- 📝 Documentation improvements  

```

# 🔧 Environment Variables

Create a `.env` file in the `backend/` directory with the following keys:

```env
# Backend .env

PORT=5000
MONGO_URL=mongodb://localhost:27017/smartagri
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# 📸 Screenshots
![image](https://github.com/user-attachments/assets/36e14b78-09fb-40b1-a90e-cda10be44ead)
![image](https://github.com/user-attachments/assets/f9003dce-aafe-4fee-82d8-e81dfcf868b6)
![image](https://github.com/user-attachments/assets/716b2b1a-9f42-4e04-8298-9a49b7a71955)
![image](https://github.com/user-attachments/assets/4083b718-f257-4bb8-b544-7a1422b6b0b8)
![image](https://github.com/user-attachments/assets/bb0eed46-e1ff-4567-8b45-d4c453ff2e58)
![image](https://github.com/user-attachments/assets/7a3f5c6b-14ae-415d-a448-fe02b5be9c90)
![image](https://github.com/user-attachments/assets/7b9e2891-20b5-4297-8178-c27a4a3a46cf)
![image](https://github.com/user-attachments/assets/beec0fbf-599e-4723-af81-0742d7dc0d55)
![image](https://github.com/user-attachments/assets/84416367-7649-41c2-98ad-ca307f7b9243)
![image](https://github.com/user-attachments/assets/7fea1bbc-1570-46c7-99b9-9ce76bf92221)
![image](https://github.com/user-attachments/assets/5d0cc988-2fe4-4489-bb5b-ea0a51c76565)

---

# 🌟 Key Features

| Module          | Innovation Factor                              |
|-----------------|------------------------------------------------|
| Subsidies       | Real-time tracking + application assistant     |
| Crop Selection  | AI-powered cultivation trend analysis          |
| Marketplace     | Escrow-based secure transactions               |
| Farm Management | IoT integration capability                     |
| Community       | Verified expert verification system            |

---

# 🤝 Contribute

We welcome contributions! Please fork the repository and submit pull requests (PRs) for:

- 🧩 New feature development  
- 🐛 Bug fixes  
- 📝 Documentation improvements

---


# 📝 MIT License

© 2025 Sukant C

---

🚀 **Permission is hereby granted**, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights to:  

- ✅ Use  
- ✅ Copy  
- ✅ Modify  
- ✅ Merge  
- ✅ Publish  
- ✅ Distribute  
- ✅ Sublicense  
- ✅ Sell copies of the Software  

and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

📜 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

---

⚠️ THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  

🛑 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,  
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


