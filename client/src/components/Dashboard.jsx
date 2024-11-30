import React, { useState } from 'react'
import{AppBar, Box, Button, TextField, Toolbar, Typography} from '@mui/material'
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const [search, setSearch] = useState('');
  let navigate=useNavigate();
  let location=useLocation();

  let handleLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("currentUser")
    navigate('/');
}

const handleSearchSubmit = (e) => {
  if (e.key === 'Enter' && search.trim()) {
    navigate(`/dashboard/search?query=${search}`);
    setSearch('');
  }
};
  return (

    <div>
      <AppBar >
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>

<Box sx={{ display: 'flex', gap: '30px' }}>
      <Typography component={Link} to="/Dashboard" sx={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>
        HOME
      </Typography>
      
      <Typography component={Link} to="createEmployee" sx={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>
        CREATE
      </Typography>

      <Typography component={Link} to="EmployeeList" sx={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>
        EMPLOYEELIST
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: '30px' }}> 
      
      <TextField component={Link} label="search" to="search" variant='filled'sx={{backgroundColor:"whitesmoke",height:'50px', width:"250px",borderRadius:"10px",marginRight:"50px",border:"none"}}  value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearchSubmit}/>

      <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: 'white', cursor: 'pointer', marginTop:"10px",marginRight:"10px" }} onClick={handleLogout}>
        LOGOUT
      </Typography>
    </Box>
          
        </Toolbar>
      </AppBar>
      
      <Box sx={{ marginTop: '64px', padding: '20px' }}>
        {location.pathname === "/dashboard" && <h1 style={{marginTop:'150px', marginLeft:'450px', fontSize:'50px'}}>welcome to Admin Page</h1>}
        <Outlet />
      </Box>
      

        
    </div>
  )
}

export default Dashboard