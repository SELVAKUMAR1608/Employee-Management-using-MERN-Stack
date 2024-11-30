const express=require('express');
const {signupPage,loginPage}=require('../controllers/login.controller');
let user=express.Router();

user.post('/signup',signupPage);
user.post('/login',loginPage);


module.exports=user;