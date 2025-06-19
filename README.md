# 📊 Chapter Performance Dashboard Backend

This is a RESTful API backend for managing and monitoring academic chapter performance. Built with Node.js, Express.js, MongoDB, and Redis, it simulates real-world backend features like authentication, file uploads, caching, rate limiting, and filtering.

---

## 🚀 Tech Stack

- **Node.js** & **Express.js** – API framework
- **MongoDB** with **Mongoose** – Database
- **Redis** – Caching and rate limiting
- **Multer** – File upload middleware
- **dotenv** – Environment variable management

---

## 📦 Features

- `GET /api/v1/chapters`  
  Fetch all chapters with support for filters:
  - `class`, `unit`, `status`, `subject`, `weakChapters=true`
  - Pagination via `page` and `limit`
  - Returns total chapter count
  - **Redis caching** for 1 hour

- `GET /api/v1/chapters/:id`  
  Fetch a specific chapter by MongoDB `_id`

- `POST /api/v1/chapters`  
  Upload JSON file containing chapters  
  - **Only accessible to admins** (`x-admin: true` header)  
  - Validates each chapter entry  
  - Saves valid ones to DB and returns failed records  
  - **Cache is invalidated** upon successful upload

- **Rate Limiting**  
  - 30 requests per minute per IP  
  - Uses Redis for distributed throttling

---

