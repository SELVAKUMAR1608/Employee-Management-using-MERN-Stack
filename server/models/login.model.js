const mongoose=require('mongoose');
let signupSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,

    },
    password:{
        type:String,
        required: true

    },
    
})
module.exports=mongoose.model('DealsDray',signupSchema,'user');