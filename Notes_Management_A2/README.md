<div align="center">

# 🚀 Notes Management API V2 (Assignment 2)
**Advanced Enterprise-Grade Backend Features Built with Node.js & MongoDB**

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

</div>

<br>

## 🌟 Overview
Welcome to **Assignment 2**, an advanced, fully-fledged extension of the Notes Management API. This project was built from scratch to demonstrate the implementation of complex, enterprise-level backend requirements.

Featuring exactly **19 meticulously crafted endpoints**, this API tackles pagination, dynamic sorting, query parameter-based filtering, date-range bounding, and precise summary extractions. It serves as a masterclass in MongoDB data querying and RESTful API architecture.

---

## ⚡ Advanced Features
- **Data Pagination:** Smart handling of `page` and `limit` query parameters, ensuring rapid response times even with massive datasets. Returns intuitive metadata (`currentPage`, `totalPages`, `totalNotes`).
- **Dynamic Sorting:** Ascending and descending sort mechanisms dynamically applicable to multiple fields (`title`, `createdAt`, `updatedAt`, `category`).
- **Complex Query Filtering:** Stackable queries! Filter dynamically by combining criteria like Category and Pinned Status.
- **Date Range Bounding:** Secure retrieval of data within explicitly defined `startDate` and `endDate` parameters.
- **Summary Extraction:** An optimized endpoint capable of fetching a note and slicing its content dynamically to generate rapid UI-friendly summaries.
- **Robust Route Architecture:** Masterful configuration of Express routing to completely prevent route shadowing and conflicts between dynamic `/:id` parameters and exact query endpoints.

---

## 📁 Project Structure

```text
Notes_Management_A2/
├── src/
│   ├── config/
│   │   └── db.js               # Database connection logic
│   ├── controllers/
│   │   └── note.controller.js  # 19 separate, highly modular business logics
│   ├── models/
│   │   └── note.model.js       # Enhanced Mongoose Schemas
│   ├── routes/
│   │   └── note.routes.js      # Intricately ordered Express routers
│   ├── app.js                  # Express app initialization
│   └── server.js               # Application entry point & server startup
├── .env                        # Environment configurations
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local instance or MongoDB Atlas)

### 2️⃣ Installation
Clone the repo and navigate to the `Notes_Management_A2` folder, then install dependencies:
```bash
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/notesDB
```

### 4️⃣ Run the Server
For development (with automatic reloads):
```bash
npm run dev
```

---

## 📡 The 19 API Endpoints

This project delivers 19 heavily tested and validated endpoints, categorized below:

### 🟢 Core CRUD & Bulk Operations
1. `POST /api/notes` - Create a note.
2. `POST /api/notes/bulk` - Bulk create notes.
3. `GET /api/notes` - Get all notes.
4. `GET /api/notes/:id` - Get note by ID.
5. `PUT /api/notes/:id` - Completely update note.
6. `PATCH /api/notes/:id` - Partially update note.
7. `DELETE /api/notes/:id` - Delete note by ID.
8. `DELETE /api/notes/bulk` - Bulk delete notes.

### 🟡 Specialized Extractions
9. `GET /api/notes/category/:category` - Fetch by URL param category.
10. `GET /api/notes/status/:isPinned` - Fetch by boolean status.
11. `GET /api/notes/:id/summary` - Fetch a 50-character content summary of a specific note.

### 🔵 Advanced Query Filtering
12. `GET /api/notes/filter` - Filter using `?category=X&isPinned=Y`.
13. `GET /api/notes/filter/pinned` - Natively fetch only pinned notes.
14. `GET /api/notes/filter/category` - Filter using `?category=X`.
15. `GET /api/notes/filter/date-range` - Filter using `?startDate=X&endDate=Y`.

### 🟣 Pagination & Sorting Data
16. `GET /api/notes/paginate` - Paginate all notes `?page=X&limit=Y`.
17. `GET /api/notes/paginate/category/:category` - Paginate within a category.
18. `GET /api/notes/sort` - Dynamic sorting `?sortBy=X&order=Y`.
19. `GET /api/notes/sort/pinned` - Sort only pinned notes `?sortBy=X&order=Y`.

---

<div align="center">
  <b>Built for maximum performance and developer experience.</b>
</div>
