# NodeJS HW Backend API

Backend API built with **Node.js**, **Express**, and **MongoDB**.
Project implements authentication via **HTTP-only cookies**, notes CRUD, user avatar upload, and password reset via email.

---

## 🚀 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Authentication: **sessions & cookies** (access / refresh tokens)
- File upload: Multer
- Image storage: Cloudinary
- Validation: Celebrate (Joi)
- Email: SMTP
- API documentation: Swagger (OpenAPI 3.0)

---

## 📦 Installation

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=
NODE_ENV=
MONGO_URL=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

JWT_SECRET=

FRONTEND_DOMAIN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## ▶️ Running the App

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

---

## 📖 API Documentation (Swagger)

Swagger UI is available at:

```
GET /api-docs
```

You can:

- explore all endpoints
- test requests directly
- upload files (avatar)
- work with cookie-based authentication

---

## 🔐 Authentication Flow (Cookies)

Authentication is handled via **HTTP-only cookies**.

### Flow:

1. `POST /auth/login`

   - sets cookies: `sessionId`, `accessToken`, `refreshToken`

2. Protected routes use `authenticate` middleware
3. `POST /auth/refresh`

   - refreshes session using cookies

4. `POST /auth/logout`

   - clears cookies and removes session

Cookies are sent automatically by the browser.

---

## 👤 Auth Endpoints

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| POST   | /auth/register            | Register new user          |
| POST   | /auth/login               | Login and set cookies      |
| POST   | /auth/refresh             | Refresh session            |
| POST   | /auth/logout              | Logout user                |
| POST   | /auth/request-reset-email | Send reset password email  |
| POST   | /auth/reset-password      | Reset password using token |

---

## 📝 Notes Endpoints

All notes endpoints require authentication.

| Method | Endpoint       | Description                                |
| ------ | -------------- | ------------------------------------------ |
| GET    | /notes         | Get notes (pagination, search, tag filter) |
| POST   | /notes         | Create note                                |
| GET    | /notes/:noteId | Get note by ID                             |
| PATCH  | /notes/:noteId | Update note                                |
| DELETE | /notes/:noteId | Delete note                                |

### Query parameters for `GET /notes`

- `tag` – filter by tag
- `search` – full-text search
- `page` – page number
- `perPage` – items per page

---

## 🖼 User Avatar

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| PATCH  | /users/me/avatar | Upload and update avatar |

- Uses `multipart/form-data`
- Field name: `avatar`
- Image is stored in Cloudinary

---

## 🗄 Database Structure

### users

```js
{
  _id, email, password, avatar, createdAt, updatedAt;
}
```

### notes

```js
{
  _id, title, content, tag, userId, createdAt, updatedAt;
}
```

---

## 🛡 Error Handling

- `400` – validation errors
- `401` – unauthorized / invalid session
- `404` – resource not found
- `500` – server error

All errors return JSON with a message.

---

## 🧪 Development Notes

- MongoDB collections are created automatically
- Sessions are invalidated on password reset
- Free MongoDB Atlas clusters **do not support backups**

---

## 📌 Project Purpose

This project is intended as:

- a learning backend project
- a base for frontend integration
- a reference for cookie-based authentication

---

## 📄 License

MIT
