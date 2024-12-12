import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../popupModal/DeleteModal';

function EmployeeList() {
  let [empData, setEmpData] = useState([]);
  let [deleteModal, setDeleteModal] = useState(false);
  let [deleteId,setDeleteId]=useState();
  let navigate = useNavigate();


  let fetchEmpDetails = async () => {
    let token=localStorage.getItem("token");
    try {
      let response = await axios.get("http://localhost:5000/api/employees",{
        headers:{"authorization":`Bearer ${token}`}
      });
      setEmpData(response.data);
      console.log(response.data);
    } catch (error) {
      alert('Error while fetching')
      console.log(error.message);
    }
  }



  useEffect(() => {
    fetchEmpDetails();
  }, [])

  let updateEmp = async (updateData) => {
    navigate('/dashboard/createEmployee', { state: { updateData } })

  }

  let confirmDelete = async () => {
    let token=localStorage.getItem("token");
    try {
      
      await axios.delete(`http://localhost:5000/api/employees/${deleteId}`,{
        headers:{"authorization":`Bearer ${token}`}
      })
      setDeleteModal(false)
      fetchEmpDetails();
      alert('Deleted succesfully')

    } catch (error) {
      alert('Error deleting the employee');
      console.log(error.message);
    }
  }

  let deleteEmp=(id)=>{
    setDeleteModal(true);
    setDeleteId(id)

  }



  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>sno</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>IMAGE</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>MobileNumber</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {empData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell><img src={data.poster} alt="image" loading='lazy' style={{ width: "100px" }} /></TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.mobile}</TableCell>
                <TableCell>{data.destination}</TableCell>
                <TableCell>{data.gender}</TableCell>
                <TableCell>{Array.isArray(data.course) ? data.course.join(", ") : data.course}</TableCell>
                <TableCell><Button variant='contained' onClick={() => updateEmp(data)}>update</Button><Button variant='contained' color='error' onClick={() => deleteEmp(data._id)}>Delete</Button></TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>
      </TableContainer>
      {deleteModal && <DeleteModal onConfirm={confirmDelete} onCancel={() => setDeleteModal(false)} />}
    </>
  )
}



export default EmployeeList