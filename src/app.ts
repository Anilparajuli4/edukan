import express, { type Request, type Response } from 'express'

import dotenv from 'dotenv'

dotenv.config()
import './database/connection.js'

const app = express()


app.get('/', (req:Request, res:Response)=>{
    res.send('hello world')
})

const port = 3000
 
app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
    
})