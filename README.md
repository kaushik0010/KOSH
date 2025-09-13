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



## 🛠️ Tech Stack
- **Frontend:** Next.js 15, React 19, TailwindCSS, ShadCN UI, Axios
- **Backend:** Next.js API Routes (Node.js, Express-like)
- **Database:** MongoDB + Mongoose  
- **Auth:** NextAuth (JWT-based authentication)  
- **Deployment:** Vercel  



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


## 📸 Screenshots

### Home Page
<img width="1920" height="2170" alt="KOSH Home Page" src="https://github.com/user-attachments/assets/d5fbc74c-aecc-4aba-8b28-97a60bc2169e" />


### Register
<img width="1920" height="1020" alt="register" src="https://github.com/user-attachments/assets/e2bc70e8-b411-4801-aeb6-fd1ad4f86e21" />


### Login
<img width="1920" height="1016" alt="login" src="https://github.com/user-attachments/assets/76d8bc41-8ccd-4aa4-b209-21d8a0ed89cf" />


### Dashboard
<img width="1920" height="1333" alt="dashboard" src="https://github.com/user-attachments/assets/bc6486d3-dbf9-425e-b800-b8d3dbaa61ab" />


### Update Profile
<img width="1920" height="1019" alt="update-profile" src="https://github.com/user-attachments/assets/069b95e5-feec-43c0-b8c5-38f980feeaf7" />


### Individual Savings Plan Creation
<img width="1920" height="1091" alt="individual savings plan" src="https://github.com/user-attachments/assets/d1268165-f655-4a57-8412-93271bf297ef" />


### All Groups
<img width="1920" height="1042" alt="all groups" src="https://github.com/user-attachments/assets/708117f9-98ea-49e6-a98d-ebd7e00eb4df" />


### Create Group
<img width="1920" height="1098" alt="create group" src="https://github.com/user-attachments/assets/aaaabdf7-b6c6-4eef-b76c-950af0c8038d" />


### Group Details
<img width="1920" height="1166" alt="group-details" src="https://github.com/user-attachments/assets/bbfc409f-22dd-499c-ab19-b3fd7ca864f0" />


### Group Savings Campaign Creation
<img width="1920" height="1175" alt="create campaign" src="https://github.com/user-attachments/assets/7019218f-ce04-42fe-8ed1-815bd9a39243" />




## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a pull request.



## ⭐ Support

If you like this project, don’t forget to star ⭐ the repo!

