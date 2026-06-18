# 🔍 CausalFunnel User Analytics Dashboard

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)


**A simplified analytics platform inspired by Hotjar, Microsoft Clarity, and CausalFunnel.**  
Track user behavior, explore session journeys, and visualize click heatmaps — all in one dashboard.

[🌐 Dummy Website](https://codefunnel-fr18.vercel.app/index.html) · [📊 Dashboard](https://codefunnel-m53f.vercel.app/sessions) · [⚙️ Setup](#-local-setup)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [System Diagrams](#-system-diagrams)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Local Setup](#-local-setup)
- [Environment Variables](#-environment-variables)
- [Assumptions & Trade-offs](#-assumptions--trade-offs)
- [Future Improvements](#-future-improvements)
- [Deployment](#-deployment)

---

## 🌐 Overview

CausalFunnel Analytics Dashboard is a full-stack behavioral analytics platform that tracks user interactions across a multi-page demo website and presents the data through an intuitive React dashboard.

Users interact with a tracked demo site. A lightweight vanilla JS tracker records events (page views, clicks) and sends them to a Node/Express backend, which stores them in MongoDB Atlas. The React dashboard then lets you explore sessions, trace user journeys, and see click heatmaps per page.

**Data flow:**
1. User visits the demo site → `tracker.js` generates a `sessionId` (UUID stored in `localStorage`)
2. Every page view and click fires a `POST /api/events` to the Express backend
3. Events are stored in MongoDB Atlas via Mongoose
4. The React dashboard queries the API to display sessions, timelines, and heatmaps

---

## 🗂 System Diagrams

### 🏗 High-Level System Architecture

<img width="3928" height="3896" alt="image" src="https://github.com/user-attachments/assets/e90bb4c6-223f-4269-ad28-e52cbb7c95dc" />


---

### 🔄 Event Tracking Flow

<img width="2128" height="2500" alt="image" src="https://github.com/user-attachments/assets/26d806f3-e575-4601-b162-7fdd6f114d89" />

---

### 📊 Session Analytics Flow

<img width="2804" height="2056" alt="image" src="https://github.com/user-attachments/assets/f4dd8569-80e7-43ac-998b-8eb7458882a1" />


---

### 🔥 Heatmap Flow

<img width="2260" height="2220" alt="image" src="https://github.com/user-attachments/assets/b6425a2f-74e6-4fd4-bb4d-4179925653b7" />


---

### 🗄 Database ER Diagram

<img width="1308" height="1308" alt="image" src="https://github.com/user-attachments/assets/75161a88-9ed7-4a89-8ab7-2a5b2b7afedd" />

---

### ☁️ Deployment Architecture

<img width="1692" height="1844" alt="image" src="https://github.com/user-attachments/assets/239bb72e-2630-471b-8845-47efd74b36c8" />

---

### 🧭 User Journey Example

<img width="812" height="3092" alt="image" src="https://github.com/user-attachments/assets/5f4bcd3e-01f0-4766-8607-d0038e612a07" />

---

## ✨ Features

### 🎯 Event Tracking

| Event | Data Captured |
|-------|--------------|
| `page_view` | sessionId, pageUrl, timestamp, userAgent |
| `click` | sessionId, pageUrl, timestamp, clickData (x, y), userAgent |

### 📊 Session Analytics
- List all recorded user sessions with total event counts
- View first and last activity timestamps per session
- Drill into a complete chronological user journey

### 🔥 Heatmap Analytics
- Aggregate click coordinates across all sessions
- Filter heatmap by specific page URL
- Overlay click dots on a live iframe preview of the page

### 🌍 Multi-Page Demo Website

Tracked pages:
- `/client/index.html` — Home / Shop
- `/client/cart.html` — Product detail


---

## 🛠 Tech Stack

### Frontend Dashboard

| Technology | Purpose |
|------------|---------|
| React 18 + Vite | UI framework & dev server |
| Tailwind CSS | Utility-first styling |
| React Router DOM | Client-side routing |
| Axios | HTTP client |
| Recharts | Data visualization |
| React Icons | Icon library |

### Tracking Script

| Technology | Purpose |
|------------|---------|
| Vanilla JavaScript | Zero-dependency tracker |
| localStorage | Session ID persistence |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM for schema modeling |

### Deployment

| Service | Purpose |
|---------|---------|
| Vercel | Frontend dashboard & demo site hosting |
| Render | Backend API hosting |
| MongoDB Atlas | Managed cloud database |

---

## 📁 Project Structure

```
causalfunnel-analytics/
│
├── client-demo/                  # Tracked demo website
│   ├── index.html                # Home / Shop page
│   ├── products.html             # Product listing page
│   ├── car.html                  # Product detail page
│   ├── checkout.html             # Checkout page
│   ├── tracker.js                # Vanilla JS tracking script
│   └── style.css                 # Shared styles
│
├── server/                       # Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js             # MongoDB connection
│   │   ├── controllers/
│   │   │   └── eventController.js
│   │   ├── models/
│   │   │   └── Event.js          # Mongoose schema
│   │   ├── routes/
│   │   │   └── eventRoutes.js
│   │   ├── app.js                # Express app setup
│   │   └── server.js             # Entry point
│   ├── .env
│   └── package.json
│
├── dashboard/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SessionTable.jsx
│   │   │   ├── EventTimeline.jsx
│   │   │   ├── HeatmapCanvas.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorState.jsx
│   │   ├── pages/
│   │   │   ├── SessionsPage.jsx
│   │   │   ├── SessionDetailsPage.jsx
│   │   │   └── HeatmapPage.jsx
│   │   ├── hooks/
│   │   │   ├── useSessions.js
│   │   │   ├── useSessionEvents.js
│   │   │   └── useHeatmap.js
│   │   ├── services/
│   │   │   └── api.js            # Axios instance
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 📡 API Reference

**Base URL:** `https://codefunnel.onrender.com/api`

---

### ✅ Health Check

```http
GET /api/health
```

**Response:**
```json
{ "status": "ok", "message": "Server is running" }
```

---

### 📥 Store Event

```http
POST /api/events
```

**Request Body:**
```json
{
  "sessionId": "04ec2eb7-b269-4625-8ac4-a3c286ebb0b4",
  "eventType": "click",
  "pageUrl": "/client/products.html",
  "timestamp": "2026-06-18T10:00:00.000Z",
  "clickData": {
    "x": 540,
    "y": 394
  },
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}
```

**Response:**
```json
{ "success": true, "data": { "_id": "...", "sessionId": "...", "eventType": "click" } }
```

---

### 📋 Get All Sessions

```http
GET /api/events/sessions
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "sessionId": "04ec2eb7-b269-4625-8ac4-a3c286ebb0b4",
      "totalEvents": 15,
      "firstEvent": "2026-06-18T08:41:18.600Z",
      "lastEvent": "2026-06-18T08:45:52.200Z"
    }
  ]
}
```

---

### 🔎 Get Session Events

```http
GET /api/events/sessions/:sessionId/events
```

**Example:** `GET /api/events/sessions/04ec2eb7-b269-4625-8ac4-a3c286ebb0b4/events`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "1",
      "eventType": "page_view",
      "pageUrl": "/client/index.html",
      "timestamp": "2026-06-18T08:41:18.600Z"
    },
    {
      "_id": "2",
      "eventType": "click",
      "pageUrl": "/client/index.html",
      "timestamp": "2026-06-18T08:42:05.000Z",
      "clickData": { "x": 412, "y": 287 }
    }
  ]
}
```

---

### 🔥 Get Heatmap Data

```http
GET /api/events/heatmap?pageUrl=/client/products.html
```

**Response:**
```json
{
  "success": true,
  "data": [
    { "x": 106, "y": 94 },
    { "x": 540, "y": 394 }
  ]
}
```

---

### 📄 Get Available Pages

```http
GET /api/events/pages
```

**Response:**
```json
{
  "success": true,
  "data": [
    "/client/index.html",
    "/client/products.html",
    "/client/car.html",
    "/client/checkout.html"
  ]
}
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- VS Code with Live Server extension (for demo site)

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd causalfunnel-analytics
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Start the dev server:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### 3. Dashboard Setup

```bash
cd dashboard
npm install
```

Create a `.env` file in `dashboard/`:

```env
VITE_API_URL=http://localhost:5000/api/events
```

Start the dev server:

```bash
npm run dev
```

Dashboard runs at: `http://localhost:5173`

---

### 4. Demo Website Setup

Open the `client-demo/` folder in VS Code and launch with **Live Server**.

The demo site will be available at:
```
http://127.0.0.1:5500/client-demo/index.html
```

> **Note:** Make sure the backend is running before visiting the demo site so events are captured correctly.

---

## 🔐 Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port for the Express server | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/analytics` |

### Dashboard (`dashboard/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL for all API requests | `http://localhost:5000/api/events` |

---

## ⚠️ Assumptions & Trade-offs

| Area | Decision | Reason |
|------|----------|--------|
| **Session ID** | Stored in `localStorage` | Simple, zero-dependency session persistence |
| **Heatmap aggregation** | Aggregates clicks across all sessions | Provides a holistic view of click patterns |
| **Click coordinates** | Viewport-based (not document-based) | Simpler to implement; suitable for fixed-layout pages |
| **Event delivery** | Events sent immediately on trigger | Keeps implementation simple; no batching delay |
| **Scroll tracking** | Not implemented | Focused on click and navigation behavior |
| **Coordinate space** | Fixed 1280×720 canvas | Normalizes coordinates for consistent heatmap rendering |

---

## 🚀 Future Improvements

- [ ] **Session-specific heatmaps** — Filter heatmap by individual session
- [ ] **Scroll depth tracking** — Track how far users scroll down each page
- [ ] **Viewport normalization** — Scale coordinates to any screen size
- [ ] **Session replay** — Replay full user sessions as a video-like playback
- [ ] **Event batching** — Queue and batch-send events to reduce API calls
- [ ] **Real-time analytics** — WebSocket-based live session monitoring
- [ ] **Rage click detection** — Identify frustration signals
- [ ] **Funnel analysis** — Track conversion paths across pages
- [ ] **Docker support** — Containerize backend and dashboard for easy deployment

---

## 🌍 Deployment

| Service | URL | Status |
|---------|-----|--------|
| 🖥️ Frontend Dashboard | [codefunnel-m53f.vercel.app/sessions](https://codefunnel-m53f.vercel.app/sessions) | ![Status](https://img.shields.io/badge/status-live-brightgreen) |
| 🌐 Demo Website | [codefunnel-fr18.vercel.app/index.html](https://codefunnel-fr18.vercel.app/index.html) | ![Status](https://img.shields.io/badge/status-live-brightgreen) |
| ⚙️ Backend API | [codefunnel.onrender.com](https://codefunnel.onrender.com) | ![Status](https://img.shields.io/badge/status-live-brightgreen) |

---

<div align="center">

Built with ❤️ as a behavioral analytics learning project.  
Inspired by [Hotjar](https://www.hotjar.com), [Microsoft Clarity](https://clarity.microsoft.com), and [CausalFunnel](https://causalfunnel.com).

</div>
