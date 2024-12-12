import React, {useState } from 'react'
import loginStyle from '../css/login.module.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { Button, Typography } from '@mui/material';

function Login() {
    let[loginData,setLoginData]=useState({
        username:'',
        password:''
    })
    let[errors,setErrors]=useState({});
    let loginNavigate=useNavigate();

    let handleLoginChange=(e)=>{
        setLoginData({...loginData,[e.target.name]:e.target.value});
        setErrors({...errors,[e.target.name]:" "});
    }
    console.log(loginData);
    

    let handleSubmit=async (e)=>{
        e.preventDefault();
        console.log('loginsumitted');
        
        try{
            let loginResponse=await axios.post('http://localhost:5000/api/login',loginData);
            console.log("loginResponse:",loginResponse);

            localStorage.setItem('currentUser',loginResponse.data.user.email)
            localStorage.setItem('token',loginResponse.data.token);
            alert(loginResponse.data.message);
            setLoginData({
                 Username:'',
                 password:'',

            })
            loginNavigate('/dashboard')
        }
            catch(error){
                console.log(error);
                if (error.response && error.response.data.errors) {
                   setErrors(error.response.data.errors)
                } else {
                    alert('user not found');}
                  

            }

    }
    
        return (
        <div className={loginStyle.loginContainer}>
            <form onSubmit={handleSubmit}>
            <div className={loginStyle.login}>
            <Typography variant='h4' color='primary' sx={{marginLeft:'150px',fontWeight:'bolder'}}>LOGIN</Typography>
                <input type="text" className={loginStyle.LoginInput}  placeholder='USERNAME' name='username' onChange={(e)=>handleLoginChange(e)} />
                {errors.username && <span style={{ color: 'red',fontSize:'15px',marginLeft:'8px' }}>{errors.username}</span>}

                <input type="password" className={loginStyle.LoginInput} placeholder='PASSWORD' name='password' onChange={(e)=>handleLoginChange(e)} />
                {errors.username && <span  style={{ color: 'red',fontSize:'15px',marginLeft:'8px' }}>{errors.password}</span>}

                <Button variant='contained' type='submit' sx={{width:'420px', height:'50px', borderRadius:'10px', marginTop:'70px',}}>LOGIN</Button>
            </div>
            </form>
           


        </div>
    )
}

export default Login