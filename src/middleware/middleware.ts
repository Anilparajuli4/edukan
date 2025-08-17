import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";


export interface AuthRequest extends Request{
    user?:{
        userName: string,
        email:string,
        id: string,
        role:string,
        password: string
    }
}


export enum Role{
    Admin = 'admin',
    Customer = 'customer'
}

class AuthMiddleware{
    async isAuthenticated(req:AuthRequest, res:Response, next:NextFunction):Promise<void>{
    const token = req.headers.authorization

    if(!token || token=== undefined){
        res.status(403).json({message: "No token provided"})
            return
    }
 jwt.verify(token, process.env.JWT_SECRET as string, async(err:any, decoded:any)=>{
    if(err){
        res.status(403).json({message: "invalid token"})
    }else{
        try {
                const data =  await User.findByPk(decoded.id)
       if(!data){
        res.status(404).json({message: "user not found"})
            return
       }
   req.user = data
   next()
        } catch (error) {
            res.status(500).json({message: "something  wen wrong"})
        }
   
    }

 })
    }
restrictTo(...roles:Role[]){
  return (req:AuthRequest, res:Response, next:NextFunction):void =>{
    let userRole = req.user?.role as Role
    if(!roles.includes(userRole)){
        res.status(403).json({message: "you do not have permission"})

    }else{
        next()
    }
  }
}

}


export default new AuthMiddleware() 