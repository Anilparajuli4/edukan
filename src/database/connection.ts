import { Sequelize } from "sequelize-typescript";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import User from "../models/userModel.js";

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'project2database',
    username: process.env.DB_USERNAME || 'root',
    dialect: 'mysql',
    port : Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '',
      models: [User],

})


sequelize.authenticate().then(()=>{
    console.log("connected database successfully"); 
    
}).catch((err)=>{
    console.log('error in databse connection', err);
    
})

sequelize.sync({force:false}).then(()=>{
    console.log("synced!!")
})


export default sequelize