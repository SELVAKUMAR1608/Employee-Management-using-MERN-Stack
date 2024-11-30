import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate} from 'react-router-dom';


const ProductedRoute=({children})=>{
    let currentUserEmail=localStorage.getItem('currentUser');
    console.log(currentUserEmail);
    
    if(currentUserEmail){
        let token=localStorage.getItem(`token`);
        console.log("movie token:",token);
    try{
       let decodedToken= jwtDecode(token);
       console.log("decodedToken:",decodedToken);
       
       if(decodedToken){
            return children;
       }
    }
    catch(error){
        console.log("invalid token");
        
        localStorage.removeItem('token');
        return <Navigate to={'/login'} />
    }}
    alert('login incomplete')
    return <Navigate to={'/login'} />
}
export default ProductedRoute