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
- [🏗️ Advanced Implementation Details](#️-advanced-implementation-details)
  - [1. Semantic Search with pgvector & Vector Embeddings](#1-semantic-search-with-pgvector--vector-embeddings)
  - [2. Payment & Checkout Idempotency](#2-payment--checkout-idempotency)
  - [3. Concurrency Control & Stock Integrity](#3-concurrency-control--stock-integrity)
  - [4. Event-Driven Workflows with Inngest](#4-event-driven-workflows-with-inngest)
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
- **Vector Search:** `pgvector` (HNSW indexing) + Google Gemini Embeddings (768-dim)
- **Payments:** Stripe Gateway + Cash on Delivery (COD)
- **State Management:** Redux Toolkit
- **Charts & Analytics:** Recharts
- **Image Optimization:** ImageKit.io
- **Serverless Jobs:** Inngest
- **Icons:** Lucide React
- **AI Integration:** Google Gemini API (Visual Product Insights & Semantic Vector Embeddings)

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

---

## 🏗️ Advanced Implementation Details

### 1. Semantic Search with pgvector & Vector Embeddings
- **Problem:** Standard SQL `ILIKE '%query%'` keyword search fails when users describe concepts (e.g. searching "outfit for beach wedding" or "running shoes with cushion") or make typographical errors.
- **Implementation:**
  - Enabled the `vector` extension in Neon PostgreSQL and added a 768-dimensional vector column (`embedding Unsupported("vector(768)")?`) to the `Product` model.
  - Built an HNSW index (`USING hnsw (embedding vector_cosine_ops)`) on the vector column for sub-linear cosine similarity queries.
  - Queries are embedded on-the-fly using Google Gemini's embedding model (`models/gemini-embedding-001` with `outputDimensionality: 768`).
  - Search queries execute via raw SQL cosine distance (`p.embedding <=> $vector::vector`) to compute `similarity = 1 - distance`.
  - **Graceful Fallback:** If vector search returns no confident matches or the embedding service is unreachable, it automatically falls back to full-text lexical search (`ILIKE`).
  - **Automated Seller Pipeline:** Whenever a seller lists a product, vector embeddings are generated asynchronously and persisted to Postgres so new items are immediately searchable.

### 2. Payment & Checkout Idempotency
- **Problem:** Double-clicking "Pay Now", browser refreshes, or network drops can retransmit payment requests. Stripe webhooks can also be delivered more than once (at-least-once delivery), risking duplicate billing or duplicate order records.
- **Implementation:**
  - Frontend generates a unique UUID-based `Idempotency-Key` header on checkout submissions.
  - The server verifies and tracks idempotency keys with a short TTL. In-flight requests are deduplicated, and completed responses are cached and safely re-served for identical keys.
  - Protects customers against double-charging during network latency or accidental multi-clicks.

### 3. Concurrency Control & Stock Integrity
- **Problem:** Multiple users attempting to checkout the last available unit of a product simultaneously during flash sales could cause overselling or negative stock.
- **Implementation:**
  - Inventory operations are validated and deducted using atomic conditional database operations.
  - Validates remaining inventory before confirming orders and dynamically marks products as `inStock: false` when quantity hits 0.

### 4. Event-Driven Workflows with Inngest
- **Problem:** Long-running post-purchase tasks (inventory synchronization, email notifications, seller fulfillment alerts) slow down customer checkout response times if executed synchronously on the main HTTP thread.
- **Implementation:**
  - Decoupled asynchronous workflows using Inngest serverless event queues.
  - Built-in automatic retries with exponential backoff for resilience against transient third-party service failures.

---

## 🎨 Credits

- **UI Design:** The front-end layout and design are inspired by *GreatStack*’s work.
- **AI Integration:** Built using Google’s Gemini API for image-to-text analysis and semantic vector embeddings.

---

## ⚖️ License

**All Rights Reserved © 2025 [GVBharadwaj18]**

This project and its source code are proprietary.  
You may not copy, modify, or redistribute any part of this software without explicit written permission from the author.

> See [Credits](#-credits) for attribution details.

---


