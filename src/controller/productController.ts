import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/middleware.js";
import Product from "../models/product.js";
import User from "../models/userModel.js";
import Category from "../models/category.js";

class ProductController{
    public static async addProduct(req:AuthRequest, res:Response):Promise<void>{
        const {productName, productDescription, productPrice, productTotalStockQty, productImageUrl, categoryId}= req.body
        if(!productName || !productDescription || !productPrice || !productTotalStockQty || !productImageUrl){
            res.status(400).json({message: "all fields are required"})
            return
        }
        let fileName
        if(req.file){
            fileName = req.file?.filename
        }else{
            fileName  = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D'
        }
        await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStockQty,
            productImageUrl: fileName,
            userId: req.user?.id,
            categoryId: categoryId
        })

        res.status(201).json({message: "product created successfully"})
    }

    public static async getAllProducts(req:Request, res:Response):Promise<void>{
        const products = await Product.findAll({
            include: [
                {
                    model: User,
                    attributes: ['email']
                },
                {
                    model: Category
                }
            ]
        })
        res.status(401).json({
            message: 'products fetched successfully',
            data: products
        })
    }

    public static async getSingleProducts(req:Request, res:Response):Promise<void>{
        const id = req.params.id
        const data = await Product.findAll({
            where:{
                id:id
            }
        })
        if(data.length === 0){
            res.status(404).json({
                message: 'no product with this id'
            })
        }else{
            res.status(200).json({
                message:'product fetched',
                data:data
            })
        }
    }

    public static async deleteProduct(req:Request, res:Response):Promise<void>{
        const id = req.params.id
       const data = await Product.findAll({
        where:{
            id:id
        }
       })

       if(data.length === 0){
          res.status(404).json({
                message: 'no product with this id'
            })
       }else{
          await Product.destroy({
            where:{
                id:id
            }
          })
          res.status(200).json({
            message: 'product deleted successfully'
          })
       }

    }
}


export default ProductController