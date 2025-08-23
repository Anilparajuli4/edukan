import express, { Router } from 'express'
import errorHandler from '../services/catchAsyncError.js'
import AuthMiddleware, { Role } from '../middleware/middleware.js'
import CategoryController from '../controller/categoryController.js'
const router:Router = express.Router()


router.route('/').post(AuthMiddleware.isAuthenticated, AuthMiddleware.restrictTo(Role.Admin), CategoryController.addCategory).get(CategoryController.getCategory)
router.route('/:id').delete(AuthMiddleware.isAuthenticated, AuthMiddleware.restrictTo(Role.Admin), CategoryController.deleteCategory)
.patch(AuthMiddleware.isAuthenticated, AuthMiddleware.restrictTo(Role.Admin), CategoryController.updateCategory)

export default router