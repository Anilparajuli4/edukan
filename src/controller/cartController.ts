import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/middleware.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import Category from "../models/category.js";

interface CartData{
  id: string | null,
  quantity: number | null,
  updatedAt: string | null,
  userId: string | null,
  productId: string | null

}


class CartController{
    async addToCart(req:AuthRequest, res:Response): Promise<void>{
        const userId = req.user?.id

        const{quantity, productId}= req.body
        if(!quantity || !productId){
            res.status(400).json({
                message: 'provide quantity and productId'
            })
        }

        let cartItem = await Cart.findOne({
            where:{
                productId,
                userId
            }
        })

        if(cartItem){
            cartItem.quantity += quantity
            await cartItem.save()
        }else{
            await Cart.create({
                quantity,
                productId,
                userId
            })

        }
res.status(200).json({
    message: 'product added to cart',
    data: cartItem
})


    }

    async getMyCarts(req:AuthRequest, res:Response){
        const userId = req.user?.id
        const cartItems = await Cart.findAll({
            where:{
                userId
            },
            include:[
                {
                    model: Product,
                    include:[{
                        model: Category,
                        attributes:['id', 'categoryName']
                    }]
                }
          
          ]
        })
        if(cartItems.length === 0){
            res.status(404).json({
                message: 'no product found in cart'
            })
        }else{
            res.status(200).json({
                message: 'Cart items fetched successfully',
                data: cartItems
            })
        }
    }

    async deleteMyCart(req:AuthRequest, res:Response):Promise<void>{
    const userId = req.user?.id
    const {id:productId} = req.params

    const product = await Product.findByPk(productId)
    if(!product){
        res.status(404).json({
            message:'product not found with that id'
        })
        return
    }


   await Cart.destroy({
        where:{
            userId,
            productId
        }
    })
res.status(200).json({
    message:'product of cart deleted successfully'
})


     }

     async updateMyCart (req:AuthRequest, res:Response){
        const {id:productId} = req.params
        const userId = req.user
        const {quantity} = req.body

        if(!quantity){
            res.status(404).json({
                message: 'quantity not found'
            })
            return
        }

        const cartData = await Cart.findOne({
            where:{
              userId,
              productId
            }
        })


        if(cartData){
          cartData.quantity = quantity
           await cartData.save()
            res.status(200).json({
            message: "Product of cart data updated successfully",
            data: cartData
        })
        }
     
       

       
     }
}


export default new CartController()