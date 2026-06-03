# 📝 Notes Management API - Assignment 03

A robust, enterprise-grade RESTful API for managing notes, built completely from scratch using **Node.js, Express, and MongoDB**. This assignment demonstrates advanced MongoDB querying capabilities, including search, filtering, sorting, pagination, and bulk operations using the Model-View-Controller (MVC) architecture.

---

## 🚀 Key Features

* **Advanced Querying**: Search by title, content, or both using MongoDB `$regex`.
* **Dynamic Filtering**: Filter notes by `category` and `isPinned` status.
* **Sorting & Pagination**: Sort notes in ascending/descending order and paginate through large datasets.
* **Master Query**: A single, ultra-flexible endpoint combining search, filter, sort, and pagination.
* **Bulk Operations**: Create and delete multiple notes simultaneously.
* **Strict MVC Architecture**: Clean separation of concerns (Routes -> Controllers -> Models).
* **Validation & Error Handling**: Comprehensive Mongoose schema validation and standardized JSON error responses.

---

## 🛠️ Tech Stack

* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB](https://www.mongodb.com/)
* **ODM**: [Mongoose](https://mongoosejs.com/)
* **Environment Management**: `dotenv`
* **Development Tool**: `nodemon`

---

## 📁 Project Structure (MVC)

```text
Notes_Management_A3/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   └── note.controller.js    # Business logic for all 18 endpoints
│   ├── models/
│   │   └── note.model.js         # Mongoose schema definition
│   ├── routes/
│   │   └── note.routes.js        # Express routing
│   ├── app.js                    # Express application configuration
│   └── server.js                 # Server entry point
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

---

## ⚙️ Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd Notes_Management_A3
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3002
   MONGODB_URI=mongodb://localhost:27017/notes_db_a3
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The server should start running on `http://localhost:3002`.*

---

## 📡 API Endpoints Reference

### 🟢 CRUD Operations
| Method   | Endpoint             | Description                           |
| :---     | :---                 | :---                                  |
| `POST`   | `/api/notes`         | Create a single note                  |
| `POST`   | `/api/notes/bulk`    | Create multiple notes in bulk         |
| `GET`    | `/api/notes`         | Retrieve all notes                    |
| `GET`    | `/api/notes/:id`     | Retrieve a specific note by ID        |
| `PUT`    | `/api/notes/:id`     | Completely replace a note by ID       |
| `PATCH`  | `/api/notes/:id`     | Partially update a note by ID         |
| `DELETE` | `/api/notes/:id`     | Delete a specific note by ID          |
| `DELETE` | `/api/notes/bulk`    | Delete multiple notes by their IDs    |

### 🔍 Search Operations (Case-Insensitive)
| Method   | Endpoint                     | Query Params | Description                                |
| :---     | :---                         | :---         | :---                                       |
| `GET`    | `/api/notes/search/title`    | `?query=`    | Search notes where title contains query    |
| `GET`    | `/api/notes/search/content`  | `?query=`    | Search notes where content contains query  |
| `GET`    | `/api/notes/search/all`      | `?query=`    | Search both title AND content              |

### 🎛️ Combined Query Operations
| Method   | Endpoint                             | Query Params                               | Description                              |
| :---     | :---                                 | :---                                       | :---                                     |
| `GET`    | `/api/notes/query/filter-sort`       | `?category=`, `?isPinned=`, `?sortBy=`, `?order=` | Filter notes and sort the results        |
| `GET`    | `/api/notes/query/filter-paginate`   | `?category=`, `?isPinned=`, `?page=`, `?limit=`   | Filter notes and paginate results        |
| `GET`    | `/api/notes/query/sort-paginate`     | `?sortBy=`, `?order=`, `?page=`, `?limit=`        | Sort notes and paginate results          |
| `GET`    | `/api/notes/query/search-filter`     | `?query=`, `?category=`, `?isPinned=`             | Search notes and apply filters           |

### 🚀 Advanced & Master Queries
| Method   | Endpoint                                   | Description                                             |
| :---     | :---                                       | :---                                                    |
| `GET`    | `/api/notes/query/search-sort-paginate`    | Combines Search (`query`), Sorting, and Pagination      |
| `GET`    | `/api/notes/query/filter-sort-paginate`    | Combines Filtering, Sorting, and Pagination             |
| `GET`    | `/api/notes/query/master`                  | **The Ultimate Endpoint:** Combines Search, Filter, Sort, & Pagination into a single request |

---

## 📖 Response Format

The API follows a standardized JSON response format across all endpoints:

**Success Response Example:**
```json
{
  "success": true,
  "message": "Notes retrieved successfully",
  "data": [
    {
      "_id": "6a1f1686a21c0175068bbbe7",
      "title": "Database Architecture",
      "content": "Designing NoSQL schemas for scale.",
      "category": "work",
      "isPinned": true,
      "createdAt": "2026-06-03T10:00:00.000Z",
      "updatedAt": "2026-06-03T10:00:00.000Z",
      "__v": 0
    }
  ]
}
```

**Error Response Example:**
```json
{
  "success": false,
  "message": "Invalid note ID format",
  "data": null
}
```

---

## 👨‍💻 Developed By

**Assignment 03** built strictly conforming to MVC guidelines, robust validation, and advanced Mongoose querying techniques. All endpoints feature `try/catch` error encapsulation to prevent application crashes.
