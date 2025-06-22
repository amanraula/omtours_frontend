# 🌍 Om Tours Frontend

A modern, blazing-fast ✈️ **React + TypeScript** frontend for the **Om Tours** travel platform.  
🌐 **Live**

---

## 📚 Table of Contents

- [📌 Overview](#-overview)  
- [✨ Features](#-features)  
- [🛠️ Tech Stack](#-tech-stack)  
- [📁 Project Structure](#-project-structure)  
- [🚀 Getting Started](#-getting-started)  
- [📜 Scripts](#-scripts)  
- [🧩 Key Components & Pages](#-key-components--pages)  
- [🔐 Authentication Flow](#-authentication-flow)  
- [🚢 Deployment](#-deployment)  
- [🤝 Contribution](#-contribution)  
- [📄 License](#-license)  
- [🔗 Links](#-links)  

---

## 📌 Overview

Om Tours is a modern single-page application (SPA) built with **React + Vite + TypeScript** to provide a smooth and elegant tour/travel booking experience.  
It’s responsive, secure, and designed for **fast iterations** and **clean structure**.  

---

## ✨ Features

✅ User Authentication (Login / Sign Up)  
🏠 Home page with featured destinations  
🎥 Watch / Tour detail pages  
🔍 Tour Search + Search History  
🔔 Toast notifications for instant feedback  
📱 Responsive UI for all devices  
🔒 Protected Routes for logged-in users  

---

## 🛠️ Tech Stack

| Tech               | Purpose                          |
|--------------------|----------------------------------|
| ⚛️ React           | Frontend framework                |
| 🟦 TypeScript       | Type-safe development             |
| ⚡ Vite             | Superfast build & dev tool       |
| 🔁 React Router DOM| Client-side routing               |
| 🌐 Axios            | API requests                     |
| 🔔 React Hot Toast | Toast notifications              |
| 🧩 Lucide React     | Clean icon set                   |
| 🎨 CSS              | Styling                          |

---

## 📁 Project Structure
![image](https://github.com/user-attachments/assets/b6ef5de0-d1cc-4e0b-9745-789ba03a6908)


---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js `v16+`  
- npm or yarn

### 🛠 Installation

```bash
git clone https://github.com/amanraula/omtours_frontend.git
cd omtours_frontend
npm install
▶️ Run Locally
bash
Copy
Edit
npm run dev
Open your browser at http://localhost:5173

🏗️ Build for Production
bash
Copy
Edit
npm run build
👀 Preview Production Build
bash
Copy
Edit
npm run preview
📜 Scripts
Command	Description
npm run dev	Start local dev server
npm run build	Type-check & build project
npm run preview	Preview production build locally

🧩 Key Components & Pages
App.tsx – App root, routing & auth logic

HomePage.tsx – Landing page with featured content

LoginPage.tsx / SignUpPage.tsx – User forms

WatchPage.tsx – Tour detail display

SearchPage.tsx – Search UI for tours

SearchHistoryPage.tsx – User's past queries

Footer.tsx – Footer across pages

authUser.ts – Manages user auth state

🔐 Authentication Flow
🔄 Auth state is managed globally via authUser.ts store

🔒 Protected Routes: /watch/:id, /search, /history

🧾 Unauthenticated users are redirected to login/signup

✅ On app load, auth status is checked before rendering protected content

🚢 Deployment
🚀 Live on Vercel
For your own deployment:

Fork this repo

Connect to Vercel

Import project and deploy

Done! ⚡

🤝 Contribution
👥 Want to contribute?

Fork the repo

Create a branch: git checkout -b feature/my-feature

Commit your changes

Push & open a PR

📄 License
📝 MIT License (Check LICENSE file for full info)

🔗 Links
🌐 Live Demo

📦 GitHub Repository

Om Tours Frontend is a ✨ clean, extensible starting point ✨ for building modern travel & booking web apps.
Have ideas or bugs? Open an issue!
