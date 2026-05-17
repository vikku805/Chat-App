import { prismaClient } from "../index.js";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


export const RegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields aresss required" });
        }
 const existingUser = await prismaClient.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const hashedPassword = hashSync(password, 10);
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        res.status(201).json({ message: "success", user });
    } catch (error) {
        console.error("Error in RegisterController:", error);
        return  res.status(500).json({ message: "Internal Server Error" });
    }
}


export const LoginController = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password ){
            return res.status(400).json({message:"All fields are required"})
        }

        const userExists = await prismaClient.user.findUnique({
            where:{email:email}
        })

        if(!userExists){
            return res.status(404).json({message:"User not found"})
        }
        const comparePassword = await compareSync(password,userExists.password)
        if(!comparePassword){
            return res.status(400).json({message:"Invalid Password"})
        }
        
        const token = await jwt.sign({id:userExists.id},process.env.JWT_SECRET,{expiresIn:'1d'})
        // console.log("User found:", token);

        return res.status(200).json({message:"success", token, userExists})
    } catch (error) {
           console.error(error);

        return res.status(500).json({message:"Something went wrong"})
    }
}

export const getUserController = async(req,res)=>{
    try {
        const userId = req.user.id; 
        if(!userId){
            return res.status(400).json({message:"User ID is required"})
        }
        const user = await prismaClient.user.findMany({
            where:{id:{not:userId}},
            select:{id:true,name:true,email:true,password:true}
        })
        return res.status(200).json({message:"Users fetched successfully",users:user})
    } catch (error) {
        console.error("Error in getUserController:", error);
        return res.status(500).json({message:"Internal Server Error"})
    }}
