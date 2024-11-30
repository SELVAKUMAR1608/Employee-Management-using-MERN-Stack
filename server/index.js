const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const bodyParser=require('body-parser');
const loginRoute=require('./routes/login.routes');
const employeeRoutes=require('./routes/createEmp.routes')
require('dotenv').config();

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api',loginRoute);
app.use("/api", employeeRoutes);

let startServer=async()=>{
    try {
        await mongoose
        .connect(process.env.MONGO_URL)
        .then(()=>console.log('mongodb connected successfully'))
        .catch ((error)=> console.log(error));
        console.log(process.env.MONGO_URL);
    
        let PORT=await process.env.PORT || 5000;
        app.listen(PORT,()=>console.log(`connected to the port ${PORT})}`))
        
    } catch (error) {
        console.log("error:",error);
        
        
    }
   
}
startServer();
