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

## Project Status

- ✅ Part 1 — Auth + basic real-time chat  
- ✅ Part 2 — Chat sessions + message persistence  
- 🚧 Part 3 — Typing indicator, read receipts, UI polish *(coming soon)*

---

## Author

**Vikas Gupta** — Senior Software Engineer