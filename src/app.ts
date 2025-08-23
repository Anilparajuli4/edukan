import express, { type Request, type Response } from 'express'
import userRoute from './routes/userRoutes.js'
import productRoute from './routes/productRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import cartRoute from './routes/cartRoute.js'
import dotenv from 'dotenv'

dotenv.config()
import './database/connection.js'
import adminSeeder from './adminseeder.js'
import categoryController from './controller/categoryController.js'


const app = express()

app.use(express.json())


app.get('/', (req:Request, res:Response)=>{
    res.send('hello world')
})

app.use("/auth", userRoute)
app.use("/adimin/product", productRoute)
app.use("/admin/category", categoryRoute)
app.use("/customer", cartRoute)

adminSeeder()
// categoryController.seedCategories()


const port = 3000
 
app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
    
})