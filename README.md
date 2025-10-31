<div align="center">
  <h1>NexusMart 🛒</h1>
  <p>
    A multi-vendor e-commerce platform built with Next.js and Tailwind CSS, featuring Stripe payments, AI-powered product insights, Cash on Delivery, and advanced admin analytics.
  </p>
  <a href="https://nexusmart-swart.vercel.app/" target="_blank">🔗 Live Project</a>
</div>

---

## 📖 Table of Contents

- [✨ Overview](#-overview)
- [🛠️ Tech Stack](#-tech-stack)
- [💡 Core Features](#-core-features)
- [🧠 AI Integration](#-ai-integration)
- [🎨 Credits](#-credits)
- [⚖️ License](#-license)


---

## ✨ Overview

**NexusMart** is a modern multi-vendor e-commerce platform where multiple sellers can register, create stores, and sell products to customers.  
It supports **Stripe payments**, **Cash on Delivery (COD)**, and features **an interactive admin dashboard** with analytics and coupon management.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Frontend:** React.js + Tailwind CSS
- **Authentication:** Clerk
- **Database:** Neon (PostgreSQL) + Prisma ORM
- **Payments:** Stripe Gateway + Cash on Delivery (COD)
- **State Management:** Redux Toolkit
- **Charts & Analytics:** Recharts
- **Image Optimization:** ImageKit.io
- **Serverless Jobs:** Inngest
- **Icons:** Lucide React
- **AI Integration:** Gemini API (for image-to-product name & description)

---

## 💡 Core Features

### 🏪 Multi-Vendor Marketplace
- Vendors can register and launch their own stores.
- Each store has its own dashboard for managing products and tracking performance.

### 👨‍💼 Seller Dashboard
- Add, edit, or remove products.
- Toggle product availability when out of stock.
- View detailed order information and fulfillment status.
- Track **daily orders and earnings** with Recharts-based analytics.

### ⚙️ Admin Dashboard
- Approve or reject new store requests.
- Toggle store visibility on the platform.
- Create and manage **discount coupons**.
- Monitor **orders, revenue, and vendor performance** using charts.

### 💳 Payment System
- Secure payments through **Stripe**.
- Option for **Cash on Delivery (COD)**.
- **Plus Membership** system with premium access and automatic billing.

### 🧑‍🤝‍🧑 User Roles
- **Normal Members:** Can browse and purchase products.
- **Plus Members:** Access exclusive deals and faster checkout.

### ⭐ Ratings & Reviews
- Customers can leave product ratings to enhance trust and visibility.

---

### 🧠 AI Integration

- **Gemini-Powered Product Auto-Fill:** NexusMart includes Gemini API integration to make product uploads smarter and faster for sellers.
- When a seller uploads a product image, Gemini AI analyzes it and automatically suggests Product name & Marketing-friendly Description.
- Reduces manual input and ensures professional, descriptive listings.
- Runs securely on the server via authenticated API requests.


## 🎨 Credits

- **UI Design:** The front-end layout and design are inspired by *GreatStack*’s work.
- **AI Integration:** Built using Google’s Gemini API for image-to-text analysis.

---

## ⚖️ License

**All Rights Reserved © 2025 [GVBharadwaj18]**

This project and its source code are proprietary.  
You may not copy, modify, or redistribute any part of this software without explicit written permission from the author.

> See [Credits](#-credits) for attribution details.

---


