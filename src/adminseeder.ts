import User from "./models/userModel.js"
import bcrypt from 'bcrypt'

const adminSeeder = async():Promise<void> =>{
const [data]=  await User.findAll({
    where:{
        email: 'anil234@gmail.com'
    }
 })

 if(!data){
    await User.create({
        email: 'anil234@gmail.com',
        password: bcrypt.hashSync(
            'anil234',
            10
        ),
        userName: 'Anil',
        role: 'admin'
    })
    console.log('admin created successfully');
    
 }else{
    console.log('admin already exists');
    
 }
}

export default adminSeeder