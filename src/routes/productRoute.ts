import express, { Router } from 'express'
import AuthMiddleware, { Role } from '../middleware/middleware.js'
import {multer, storage} from '../middleware/multerMiddleware.js'
import ProductController from '../controller/productController.js'

const upload = multer({storage: storage})
const router:Router = express.Router()


router.route('/').post(AuthMiddleware.isAuthenticated, AuthMiddleware.restrictTo(Role.Admin), upload.single('image'), ProductController.addProduct)
.get(ProductController.getAllProducts).get()

router.route('/:id').get(AuthMiddleware.isAuthenticated, ProductController.getSingleProducts).get(AuthMiddleware.isAuthenticated, AuthMiddleware.restrictTo(Role.Admin), ProductController.deleteProduct)



export default router