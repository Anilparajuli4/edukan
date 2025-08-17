import type { Request, Response } from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController{
   public static async registerUser(req:Request, res:Response):Promise<void>{

        const {userName, email, password, role} = req.body;
        try {
             if(!userName  || !email || !password){
            res.status(400).json({
                message: 'please provide all the fields'
            })
            return
        }
        await User.create({
            userName,
            email,
            password: await bcrypt.hash(password, 10),
            role: role
        })

        res.status(201).json({
            message:'user created successfully'
        })
        } catch (error:any) {
            res.status(500).json({
                message:error.message
            })
        }
       
    }


    public static async loginUser(req:Request, res:Response):Promise<void>{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                message: "please provide all the fields"
            })
            return
        }

        const [data] = await User.findAll({
            where:{
                email: email
            }
        })
       
        if(!data){
            res.status(404).json({
                message:"user not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, data?.password as string)
        if(!isPasswordValid){
             res.status(401).json({
                message: "invalid credentials"
             })
             return
        }

       const token  =  jwt.sign({id:data?.id}, process.env.JWT_SECRET as string, {expiresIn: '4d'})
       res.status(200).json({
        message: 'login successfully',
        data: token
       })
    }
}


export default AuthController