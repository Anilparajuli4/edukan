import {Sequelize, DataTypes} from 'sequelize'
import dbConfig from '../config/dbConfig.js'


const sequelize = new Sequelize(dbConfig.db, dbConfig.User, dbConfig.password, {
    host: dbConfig.Host,
    dialect: dbConfig.dialect,
    port:3306,
    pool:{
        acquire: dbConfig.pool.acquire,
        min: dbConfig.pool.min,
        max: dbConfig.pool.max,
        idle: dbConfig.pool.idle
    }
})



sequelize.authenticate().then(()=>{
    console.log('database connected successfully');
    
}).catch((err)=> {
    console.log(err);
    
})


const db:any = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


db.sequelize.sync({force:false}).then(()=> {
    console.log('migrate successfully');
    
})

export default db