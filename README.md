# SMART-AGRICONNECT 🌱

![Smart AgriConnect Banner](https://placehold.co/1200x400/2d5e3d/white?text=SMART-AGRICONNECT+Banner) <!-- Replace with actual banner image -->

## 📌 Table of Contents
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#%EF%B8%8F-installation)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [API Endpoints](#-api-endpoints)
- [License](#-license)

## 🌾 Problem Statement
| Challenge | Impact |
|-----------|--------|
| Unclear subsidy information | Farmers miss financial benefits |
| No crop demand data | Oversupply → Low prices |
| Fragmented knowledge sharing | Limited access to expert advice |
| Manual trading processes | Inefficient market access |
| Outdated farm practices | Reduced productivity |

## 💡 Solution
**Five Integrated Modules:**
1. **Subsidy Navigator** - Real-time government scheme tracking
2. **Crop Oracle** - AI-powered planting recommendations
3. **AgriMarket** - Digital trading with escrow
4. **Farm Genius** - IoT-ready management system
5. **Krishi Community** - Verified expert Q&A platform

## 🛠 Tech Stack
**Frontend**:
- React + Vite (Admin & Frontend)
- Tailwind CSS
- Cloudinary Media Management

**Backend**:
- Node.js + Express
- MongoDB (NoSQL Database)
- JWT Authentication
- RESTful APIs

## 📂 Project Structure

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
