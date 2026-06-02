<div align="center">

# 📝 Notes Management API (Assignment 1)
**A Robust, Production-Ready RESTful API Built with Node.js & MongoDB**

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

[**View Postman API Documentation Here 🚀**](https://documenter.getpostman.com/view/50840748/2sBXwpMWDQ)

</div>

<br>

## 🌟 Overview
Welcome to **Assignment 1**, the core API for the Notes Management workspace. This project serves as a highly structured, scalable backend for a note-taking application. It follows the **Model-View-Controller (MVC)** design pattern, ensuring that the code remains clean, modular, and easy to maintain.

Every endpoint is equipped with strict validation, standard response formatting, and elegant error handling to ensure a robust integration experience for frontend clients.

---

## ✨ Features
- **Full CRUD Support:** Create, Read, Update (PUT/PATCH), and Delete notes.
- **Bulk Operations:** Endpoints dedicated to inserting or deleting multiple notes at once.
- **Filtering Mechanisms:** Instantly fetch notes by their `category` or `isPinned` status.
- **MVC Architecture:** Clean separation of concerns (Routes -> Controllers -> Models).
- **Strict Validation:** Mongoose-driven schema validation combined with ObjectID format checking.
- **Unified API Response:** Every response guarantees the structure `{ success, message, data }`.

---

## 📁 Project Structure

```text
Notes_Management/
├── src/
│   ├── config/
│   │   └── db.js               # Database connection logic
│   ├── controllers/
│   │   └── note.controller.js  # Core business logic for notes
│   ├── models/
│   │   └── note.model.js       # Mongoose Schema definitions
│   ├── routes/
│   │   └── note.routes.js      # Express router configurations
│   ├── app.js                  # Express app initialization
│   └── server.js               # Application entry point & server startup
├── .env                        # Environment configurations (Port, MongoDB URI)
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local instance or MongoDB Atlas)

### 2️⃣ Installation
Clone the repo and navigate to the project folder, then install dependencies:
```bash
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/notesDB
```

### 4️⃣ Run the Server
For development (with automatic reloads):
```bash
npm run dev
```
For production:
```bash
npm start
```

---

## 📡 API Endpoints

> **Note:** For comprehensive payloads, parameter details, and response examples, please refer to the [**Official Postman Documentation**](https://documenter.getpostman.com/view/50840748/2sBXwpMWDQ).

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/notes` | Create a new single note |
| **POST** | `/api/notes/bulk` | Create multiple notes simultaneously |
| **GET** | `/api/notes` | Fetch all existing notes |
| **GET** | `/api/notes/:id` | Fetch a single note by its unique ID |
| **PUT** | `/api/notes/:id` | Completely update a specific note |
| **PATCH**| `/api/notes/:id` | Partially update a specific note |
| **DELETE**| `/api/notes/:id` | Remove a specific note by ID |
| **DELETE**| `/api/notes/bulk` | Remove multiple notes simultaneously |
| **GET** | `/api/notes/category/:category`| Fetch notes filtered by a specific category (`work`, `personal`, `study`) |
| **GET** | `/api/notes/status/:isPinned` | Fetch notes filtered by their pinned status (`true` / `false`) |

---

<div align="center">
  <b>Built for maximum performance and developer experience.</b>
</div>
