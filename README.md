# 💰 KOSH - Fintech Savings Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)

## 📖 Overview
**KOSH** is a prototype fintech savings platform that mimics real-world financial applications.  
It enables both **individual** and **group savings**, with features like automated contributions, group rules, penalties, and dashboards.  
The platform is built with the **MERN stack + Next.js (App Router)** and follows modern system design practices.  

👉 [Live Demo](https://kosh-pearl.vercel.app)

---

## ✨ Features
- 🔐 **Authentication** – Secure login/register with email verification (NextAuth + JWT).  
- 👤 **User Profiles** – Update wallet balance and personal details.  
- 💳 **Wallet System** – Track top-ups and transactions.  
- 📊 **Individual Savings** – Create personal saving campaigns with start & end dates.  
- 👥 **Group Savings** – Form groups (public/private) with size limits, criteria, and admin approval.  
- 📅 **Campaigns** – Automated monthly contributions with late penalty enforcement (≤40%).  
- 💰 **Distribution** - Equal distribution among campaign members after campaign ends.
- 📈 **Dashboards** – View savings progress, wallet history, joined groups and active campaigns.  
- 📝 **Validation Rules** – 
  - Group admins must delete their group before deleting account.  
  - Users joining after campaign start are excluded from contributions. 
  - Group admins must distribute campaign savings before starting a new campaign, deleting group
  - Max 3 group joining requests allowed per group to prevent spam and system abuse
- 🌐 **Deployment** – Hosted on **Vercel**, connected with **MongoDB Atlas**.  

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, React 19, TailwindCSS, ShadCN UI, Axios
- **Backend:** Next.js API Routes (Node.js, Express-like)
- **Database:** MongoDB + Mongoose  
- **Auth:** NextAuth (JWT-based authentication)  
- **Deployment:** Vercel  

---

## 📂 Project Structure
    /app
        /api → Next.js API Routes
        /auth → Authentication pages
        /dashboard → User dashboard pages
        /groups → Group savings pages
    /src
        /features → Feature-based modules (auth, savings, profile)
        /components → Reusable UI components
    /components 
        /ui -> Shadcn ui components

---
## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kaushik0010/KOSH.git
cd kosh
```
### 2️⃣ Install Dependencies
```
pnpm install
```
### 3️⃣ Configure Environment Variables

Create a .env.local file and add:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
RESEND_API_KEY=your_resend_api_key
```

### 4️⃣ Run Locally
```
pnpm dev
```
Visit http://localhost:3000

### 5️⃣ Build for Production
```
pnpm build
pnpm start
```

---
## 📸 Screenshots


---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a pull request.

---

## ⭐ Support

If you like this project, don’t forget to star ⭐ the repo!

