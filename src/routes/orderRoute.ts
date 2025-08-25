import express, { Router } from 'express'
import errorHandler from '../services/catchAsyncError.js'
import AuthMiddleware, { Role } from '../middleware/middleware.js'
import CategoryController from '../controller/categoryController.js'
import orderController from '../controller/orderController.js'
const router:Router = express.Router()

router.route('/').post(AuthMiddleware.isAuthenticated, orderController.createOrder)
router.route('/verify').post(AuthMiddleware.isAuthenticated, orderController.verifyTransaction)

export default router