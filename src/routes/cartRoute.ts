import express, { Router } from 'express'
import AuthMiddleware, { Role } from '../middleware/middleware.js'
import cartController from '../controller/cartController.js'




const router:Router = express.Router()


router.route('/').post(AuthMiddleware.isAuthenticated,  cartController.addToCart).get(AuthMiddleware.isAuthenticated, cartController.getMyCarts)
router.route('/id').patch(AuthMiddleware.isAuthenticated, cartController.updateMyCart).delete(cartController.deleteMyCart)




export default router