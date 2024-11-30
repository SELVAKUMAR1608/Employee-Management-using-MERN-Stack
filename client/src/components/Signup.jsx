import React, { useState } from 'react'
import signupStyle from '../css/signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography } from '@mui/material';

function Signup() {
    
    let[formData,setFormdata]=useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    let[errors,setErrors]=useState({});
    let navigate=useNavigate();

   let handleChange=(e)=>{
        setFormdata({...formData,[e.target.name]:e.target.value});
        setErrors({ ...errors, [e.target.name]: '' });
    }
    console.log(formData);

    let handleFormData=async (e)=>{
        e.preventDefault();
        console.log('submitted');
        console.log(formData);
        try {
            let response=await axios.post('http://localhost:5000/api/signup',formData)
            console.log(response.data.message);
            
           if(response.data.message==="Email already exist" || response.data.message==="mobile already exist"){
          
            alert(response.data.message)
           }else{
            alert('signup succesfull')
            setFormdata({
              firstname:'',
              lastname:'',
              email:'',
              mobile:'',
              password:'',
              confirmpassword:''
          })
          navigate('/login')
           }
          
        } catch (error) {
            console.log(error);
            
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
              } else {
                alert("Something went wrong!");
              }
        }
        console.log('submitted');
        
    }
  return (
    <div className={signupStyle.signupContainer}>
        <form onSubmit={handleFormData}>
        <div className={signupStyle.signup}>
        <Typography variant='h4' color='primary' sx={{marginLeft:'150px',fontWeight:'bolder'}}>signup</Typography>
        <input type="text"  className={signupStyle.signupInput}name='username' placeholder='Username'  onChange={handleChange}/>
        {errors.username && <span style={{ color: 'red',fontSize:'15px',marginLeft:'8px' }}>{errors.username}</span>}

        <input type="email" className={signupStyle.signupInput} name='email' placeholder='Email' onChange={handleChange} />
        {errors.email && <span style={{ color: 'red', fontSize:'15px', marginLeft:'8px' }}>{errors.email}</span>}

        <input type="password" className={signupStyle.signupInput} name='password' placeholder='Password' onChange={handleChange}/>
        {errors.password && <span style={{ color: 'red',fontSize:'15px',marginLeft:'8px' }}>{errors.password}</span>}

        <input type="password" className={signupStyle.signupInput} name='confirmPassword' placeholder='Confirm Password'onChange={handleChange} />
        {errors.confirmPassword && <span style={{ color: 'red',fontSize:'15px',marginLeft:'8px'}}>{errors.confirmPassword}</span>}

        <Button variant='contained'type='submit' sx={{width:'420px', height:'70px', marginBottom:'10px', marginTop:'20px'}}>SIGNUP</Button>
        <Button variant='outlined' component={Link} to="/login" sx={{width:'420px', height:'70px'}}>LOGIN</Button>
        </div>
        </form>
       
        
    </div>
  )
}

export default Signup