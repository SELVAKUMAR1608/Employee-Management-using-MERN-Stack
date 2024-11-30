const user =require('../models/login.model')
const bcyrpt=require('bcryptjs')
const jwt=require('jsonwebtoken');
require('dotenv').config();
let signupPage=async(req,res)=>{

    const { username, email, password, confirmPassword } = req.body
        let hashedPassword=await bcyrpt.hash(password,10);
        try {
            let errors = {};

            if (!username) errors.username = "Username is required";
            if (!email) errors.email = "Email is required";
            if (!password) errors.password = "Password is required";
            if (password.length<8) errors.password= "Password must contain 8 digit"
            if (!confirmPassword) errors.confirmPassword = "Confirm Password is required";
            if (password && confirmPassword && password !== confirmPassword)
              errors.confirmPassword = "Passwords do not match";
          
            if (Object.keys(errors).length > 0) {
              return res.status(400).json({ errors });
            }

            let isEmail=await user.findOne({email});
            if(isEmail){
               return res.status(200).json({ errors: { email: "Email already exists" } })
            }

                let newUser=new user({
                    username:username.trim(),
                    email:email.trim(),
                    password:hashedPassword});
                await newUser.save();
    
                
                 return res.status(201).json({message:'user signup successfully'})
           
        } catch (error) {
            
            res.status(500).json({message:'server error',error});
            console.log(error);
            
        }
    }
 
let loginPage=async(req,res)=>{
    let{username,password}=req.body;
        console.log('Login request received:', req.body);
        try {
            // let errors={};
            //  if(!username) errors.username="username is required";
            //  if(!password) errors.password="Password is required";

            //  if(Object.keys(errors).length>0){
            //     return res.status(400).json({errors});
            //  }
             
            let existingUser=await user.findOne({username})
            let errors={};
            if(!username) errors.username="username is required";
            if(!password) errors.password="Password is required";
            // if(!existingUser) errors.username="user Not Fount"

            if(Object.keys(errors).length>0){
               return res.status(400).json({errors});
            }
            
            if(!existingUser){
             
                return res.status(401).json({message:'user not found'})
            }

            let isPassword=await bcyrpt.compare(password,existingUser.password)
            if(!isPassword){
                return res.status(401).json({message:'invalid username or password'})
                
            }
            let generateToken=(user)=>{
    
                return jwt.sign({
                    userId:user._id,
                    email:user.email},
                    process.env.JWT_SECRET)
            }

            let token=generateToken(existingUser);
            return res.status(200).json({message:'successfully loged in',
                token,
                user:{id:existingUser._id,email:existingUser.email}
            })
        } catch (error) {
            console.log('Error during login:', error);
             return res.status(500).json({ message: 'Server error', error });
            
        }
}  

let dashboard=(req,res)=>{
   
    res.status(200).json({message:'dashboard opened',user:req.user})

}

//middleware to verify token//


let secreteKey=process.env.JWT_SECRET
let verifyToken=async (req,res,next)=>{
    try{
       let token= req.headers['authorization'].split(' ')[1];
       console.log('authheader:',token);
       
       if(!token){
           return res.status(401).json({message:"request failed no token provided"})
       }
       
       req.user=jwt.verify(token,secreteKey);
       next();
   }
   catch(error){
       res.status(400).json({message:"invalid token"})
   }
}

module.exports={signupPage,loginPage,dashboard,verifyToken}
