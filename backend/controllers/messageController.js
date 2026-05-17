import { parse } from "dotenv";
import { prismaClient } from "../index.js"; 

export const sendMessageController = async (req, res) => {
    try {
        const {receiverId, text } = req.body;
        const senderId = req.user.id;
        if (!receiverId || !text) {
            return res.status(400).json({ message: "Receiver ID and text are required" });
        }
        const message = await prismaClient.message.create({
            data: {
                senderId,
                receiverId,
                text
            }
        });
        res.status(201).json({ message: "Message sent successfully", data: message });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessagesController = async(req,res)=>{
    try {
        const {receiverId} = req.params;
        const senderId = req.user.id;

        const messages = await prismaClient.message.findMany({
            where:{
            //    receiverId: Number(receiverId),
               OR: [
                   { senderId,receiverId:parseInt(receiverId) },
                   { senderId:parseInt(receiverId),receiverId:senderId }

               ]
            },
            orderBy:{createdAt:"desc"}
        })

        return res.status(200).json({
            message:"Messages Fetch Successfsssssssssssully",
            messages
        })
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}