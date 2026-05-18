# Real-Time Chat App — React, Node.js, Socket.IO & Prisma

A full-stack one-to-one chat app I built to learn and implement real-time
messaging with persistent chat history.

---

## Features

- Register / Login with JWT authentication
- Real-time messaging using Socket.IO
- One-to-one chat sessions (reused across logins — no duplicates)
- Message history saved in DB and restored on reload
- Online users tracking
- Clean responsive UI with Tailwind CSS

---

## Tech Stack

| Layer        | Technology                    |
| ------------ | ----------------------------- |
| Frontend     | React.js (Vite), Tailwind CSS |
| Backend      | Node.js, Express.js           |
| Database     | MySQL + Prisma ORM            |
| Real-Time    | Socket.IO                     |
| Auth         | JWT                           |

---

## How It Works

1. User logs in → JWT is verified
2. Socket connects → user is added to online users
3. A chat session is created once per user pair and reused every time
4. Messages are sent in real-time via Socket.IO and saved to MySQL
5. On reopening a chat, full message history is loaded automatically

This is similar to how WhatsApp handles chats — one session per pair, always.

---
## Preview

**User3's view**
<img width="1915" height="867" alt="Image" src="https://github.com/user-attachments/assets/b8348d76-db12-4396-a395-f070b9e5ee98" />
**User5's view**
<img width="1915" height="862" alt="Image" src="https://github.com/user-attachments/assets/3c16e9c0-b833-465f-bc25-8a815379b080" />
---

## API Endpoints

All protected routes require `auth-token` header with a valid JWT.

### 🔐 Register — `POST /api/auth/register`
Creates a new user account.

<img width="1427" height="900" alt="Image" src="https://github.com/user-attachments/assets/c9bc8f7f-98e7-40ef-85c2-6f6dd2bafddd" />

---

### 🔐 Login — `POST /api/auth/login`
Returns a JWT token on successful login.

<img width="1427" height="917" alt="Image" src="https://github.com/user-attachments/assets/2f997bf5-16e2-4a0c-93d7-1ea2c7fe088d" />

---

### 👥 Get Users — `GET /api/auth/getUser`
Returns list of all registered users. Requires `auth-token`.

<img width="1427" height="922" alt="Image" src="https://github.com/user-attachments/assets/08a91dfe-b8ca-46f9-a583-7e93dc98c57c" />

---

### 💬 Send Message — `POST /api/messages/sendMessage`
Sends a message to a user by `receiverId`. Requires `auth-token`.

<img width="1436" height="922" alt="Image" src="https://github.com/user-attachments/assets/5eda750e-6fc3-4549-93cf-f6449a4aac0b" />

---

### 📨 Get Messages — `GET /api/messages/getMessages/:userId`
Fetches full chat history with a specific user. Requires `auth-token`.

<img width="1428" height="900" alt="Image" src="https://github.com/user-attachments/assets/d6f43b7d-4baf-4a00-a680-79f2881ae53f" />

---
## Project Status

- ✅ Part 1 — Auth + basic real-time chat  
- ✅ Part 2 — Chat sessions + message persistence  
- 🚧 Part 3 — Typing indicator, read receipts, UI polish *(coming soon)*

---

## Author

**Vikas Gupta** — Senior Software Engineer
