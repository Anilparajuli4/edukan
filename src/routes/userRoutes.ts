import express, { Router } from 'express'
import AuthController from '../controller/userController.js'
import errorHandler from '../services/catchAsyncError.js'

const router:Router = express.Router()


router.route('/register').post(errorHandler(AuthController.registerUser))
router.route('/login').post(errorHandler(AuthController.loginUser))

export default router