import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/middleware.js";
import Product from "../models/product.js";

class ProductController{
    public static async addProduct(req:AuthRequest, res:Response){
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
}


export default ProductController