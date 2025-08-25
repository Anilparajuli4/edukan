import type {  Response } from "express";
import type { AuthRequest } from "../middleware/middleware.js";
import { PaymentMethod, PaymentStatus, TranscationStatus, type KhaltiResponse, type OrderData, type TransactionVerificationResponse } from "../types/orderTypes.js";
import Order from "../models/order.js";
import Payment from "../models/payment.js";
import OrderDetails from "../models/orderDetails.js";
import axios from "axios";




class OrderController{

    async createOrder(req:AuthRequest, res:Response): Promise<void>{
        const userId = req.user
      const {phoneNumber, shippingAddress, totalAmount, paymentDetails, items}:OrderData = req.body
      if(!phoneNumber || !shippingAddress || !totalAmount || !paymentDetails || !paymentDetails.paymentMethod || items.length === 0){
        res.status(404).json({
        message: 'all fields are required'
        })
        return
      }

const paymentData = await Payment.create({
    paymentMethod: paymentDetails.paymentMethod
})

const orderData = await Order.create({
    phoneNumber,
    shippingAddress,
    totalAmount,
    userId,
    paymentId: paymentData.id
})

for (var i =0; i<items.length; i++){
    await OrderDetails.create({
        quantity: items[i]?.quantity,
        productId: items[i]?.productId,
        orderId: orderData.id

    })
}

if(paymentDetails.paymentMethod === PaymentMethod.Khati){
  const data = {
    return_url : "http://localhost:3000/success",
    purchase_order_id: orderData.id,
    amount: totalAmount * 100,
    website_url: "http://localhost:3000",
    purchase_order_name: "orderName_" + orderData.id,
    
  }
const response = await  axios.post('https://dev.khalti.com/api/v2/epayment/initiate/', data, {
    headers:{
        'Authorization': 'key eb811a2e4ce146cb99fc6edb3395584f',

    }
  })
  const khaltiResponse:KhaltiResponse = response.data
  paymentData.pidx = khaltiResponse.pidx
  await paymentData.save()
  res.status(200).json({
    message:'order placed successfully',
    url: khaltiResponse.payment_url
  })
}else{
    res.status(200).json({
        message:'order placed successfully'
    })
}

    }

    async verifyTransaction(req:AuthRequest, res:Response):Promise<void>{
      const {pidx} = req.body
      if(!pidx){
        res.status(400).json({
          message: 'provide pidx'
        })
        return
      }

      const userId = req.user?.id
const response = await axios.post('https://dev.khalti.com/api/v2/epayment/lookup', {
  pidx
}, {
  headers:{
    'Authorization': 'Key eb811a2e4ce146cb99fc6edb3395584f'
  }
})

const data:TransactionVerificationResponse = response.data
if(data.status === TranscationStatus.Completed){
await Payment.update({
  paymentStatus: 'paid'
},{
  where:{
    pidx
  }
})

res.status(200).json({
  message:'payment varified successfully'
})
}else{
  res.status(200).json({
    message: ''
  })
}

    }
}


export default new OrderController