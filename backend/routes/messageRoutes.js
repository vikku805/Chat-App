import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { sendMessageController } from "../controllers/messageController.js";
import { getMessagesController } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post('/sendMessage',authMiddleware,sendMessageController)
messageRouter.get('/getMessages/:receiverId',authMiddleware,getMessagesController)

export default messageRouter;