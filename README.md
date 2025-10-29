# 🏗️ Multi-Tenant Project Management Application

A professional-grade **multi-tenant project management web application** built with **NestJS** (backend) and **React** (frontend).  
It demonstrates clean architecture, modular code organization, secure JWT authentication, and complete tenant data isolation.

---

## 🚀 Live Demo

🔗 **Frontend:** [https://testtechniquefront.netlify.app/login](https://testtechniquefront.netlify.app/login)  
🔗 **Backend API (Swagger):** [https://project-management-c5kp.onrender.com/api](https://project-management-c5kp.onrender.com/api)

---

## 🧠 Overview

Each **tenant (organization)** has its own isolated workspace containing:
- Users  
- Projects  
- Tasks  
- Comments  

Users can belong to one or more organizations.  
Each tenant’s data is **fully isolated** and cannot be accessed by other tenants.

---

## 🧩 Tech Stack

### **Backend**
- **NestJS** — Progressive Node.js framework for scalable architecture.  
- **TypeORM** — ORM for PostgreSQL with strong TypeScript support.  
- **PostgreSQL** — Relational database used for tenant data storage.  
- **Passport + JWT** — Authentication and authorization management.  
- **Swagger** — Automatic API documentation.  
- **Jest** — Unit testing for backend modules.

### **Frontend**
- **React 18** — Component-based UI library for building SPA interfaces.  
- **React Router DOM** — Routing and navigation between pages.  
- **Axios** — Simplified HTTP client for API requests.  
- **Tailwind CSS** — Utility-first CSS framework for fast styling.  
- **React Context API** — State and authentication management.

---

## 📦 Installation & Setup

### Prerequisites
- Node.js **>=18**
- PostgreSQL **>=14**

### Backend Setup

```bash
git clone https://github.com/Amemorte99/project-management
cd project-management
npm install
cp .env.example .env
# Configure DATABASE_URL and JWT_SECRET in .env
npm run start:dev
