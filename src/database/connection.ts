import { Sequelize } from "sequelize-typescript";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import User from "../models/userModel.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Cart from "../models/cart.js";

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
      models: [User, Product, Category, Cart],

})


sequelize.authenticate().then(()=>{
    console.log("connected database successfully"); 
    
}).catch((err)=>{
    console.log('error in databse connection', err);
    
})

sequelize.sync({force:false}).then(()=>{
    console.log("synced!!")
})


//Relationship
User.hasMany(Product, {foreignKey: 'userId'})
Product.belongsTo(User, {foreignKey: 'userId'})

// Product.hasOne(Category, {foreignKey: 'categoryId'})
// Category.belongsTo(Product, {foreignKey: 'categoryId'})

Product.belongsTo(Category, {foreignKey: "categoryId"})
Category.hasMany(Product, {foreignKey: "categoryId"})


// Cart.hasMany(Product, {foreignKey:"productId"})
// Product.belongsTo(Cart, {foreignKey: "productId"})

Product.hasMany(Cart, {foreignKey: "productId"})
Cart.belongsTo(Product, {foreignKey: "productId"})



export default sequelize