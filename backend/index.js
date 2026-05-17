// index.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import rooRouter from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token"],
  })
);


// Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", rooRouter);

// Prisma Client
export const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// HTTP Server
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store online users: userId => socketId
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Register user
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} is online`);
  });

  // Send message
  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    try {
      // Save message to database
      const message = await prismaClient.message.create({
        data: {
          senderId,
          receiverId,
          text,
        },
      });

      // Find receiver socket
      const receiverSocket = onlineUsers.get(receiverId);

      // Send message if receiver is online
      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", message);
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Disconnect user
  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});