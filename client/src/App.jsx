import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProductedRoute from './components/ProductedRoute'
import CreateEmployee from './components/CreateEmployee'
import EmployeeList from './components/EmployeeList'
import SearchEmp from './components/searchEmp'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/signup'/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Dashboard' element={<ProductedRoute> 
          <Dashboard/>
        </ProductedRoute>}>
        <Route path='createEmployee' element={<CreateEmployee/>}/>
        <Route path='employeeList' element={<EmployeeList/>}/>
        <Route path="search" element={<SearchEmp />} />
        </Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App