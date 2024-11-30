import { Button, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BackupIcon from '@mui/icons-material/Backup';
import createStyle from '../css/createEmployee.module.css';
import EmployeeList from './EmployeeList';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CreateEmployee() {
    let [createEmp, setCreateEmp] = useState({
        name: '',
        email: '',
        mobile: '',
        destination: '',
        gender: '',
        course: '',
        file: null,
    })
    let[imageUpload,setImageUpload]=useState();
    let location = useLocation();
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    useEffect(() => {
        if (location.state && location.state.updateData) {
            setCreateEmp(location.state.updateData)
        }
    }, [location.state])

    let handleChange = (e) => {
        setCreateEmp({ ...createEmp, [e.target.name]: e.target.value })
    }
    console.log(createEmp);

    let formReset = () => {
        setCreateEmp({
            name: '',
            email: '',
            mobile: '',
            destination: '',
            gender: '',
            course: '',
            file: null,

        })

    }

    let formSubmit = async (e) => {
        e.preventDefault();
        console.log('emp detailsubmitted');
        let formData=new FormData();
        formData.append("name",createEmp.name)
        formData.append("email",createEmp.email)
        formData.append("mobile",createEmp.mobile)
        formData.append("destination",createEmp.destination)
        formData.append("gender",createEmp.gender)
        formData.append("course",createEmp.course)
        if(imageUpload){
            formData.append("poster",imageUpload)
        }
        console.log("form data:",formData);
        
        try {
            if (createEmp._id) {
                await axios.put(`http://localhost:5000/api/employees/${createEmp._id}`, formData);
                alert("updated successfully");

            } else {
                await axios.post("http://localhost:5000/api/employees", formData);
                alert("Employee Details Created successfully")
                formReset();
            }

        } catch (error) {
            console.log(error.message);
        }
    }

   
    return (
        <section className={createStyle.mainContainer}>
            <div className={createStyle.formContainer} onChange={(e) => handleChange(e)}>
                <Typography variant='h5' color='primary' sx={{ marginBottom: '20px', marginTop: '-15px', fontWeight: 'bold' }}>CREATE  EMPLOYEE  DETAILS  HERE</Typography>
                <form onSubmit={(e) => formSubmit(e)}>
                    <div className={createStyle.nameContainer}>
                        <input type="text" placeholder='Name' name='name' value={createEmp.name} className={createStyle.input} />
                    </div>
                    <div className={createStyle.emailContainer}></div>
                    <input type="email" placeholder='Email' name='email' value={createEmp.email} className={createStyle.input} />
                    {/* </div> */}

                    <div className={createStyle.MobileContainer}>
                        <input type="tel" placeholder='Mobile Number' name='mobile' value={createEmp.mobile} className={createStyle.input} />
                    </div>
                    <div className={createStyle.destinationContainer}>
                        <select name='destination' className={createStyle.input}>
                            <option value="">DESTINATION</option>
                            <option value='HR'>HR</option>
                            <option value='Manager'>Manager</option>
                            <option value='Sales'>Sales</option>
                        </select>
                    </div>


                    <div className={createStyle.selectContainer}>
                        <label for="gender" ><span>Select Gender:</span></label>
                        <label><input type="radio" name="gender" value='male' id='gender' />Male</label>
                        <label><input type="radio" name="gender" value='female' id='gender' />Female</label>
                        <label><input type="radio" name="gender" value='other' id='gender' />Other</label>
                    </div>

                    <div className={createStyle.selectContainer}>
                        <label htmlFor="course"><span>select Course:</span></label>
                        <label><input type="checkbox" name='course' value='MCA' id='course' /> MCA</label>
                        <label><input type="checkbox" name='course' value='BCA' id='course' />BCA</label>
                        <label><input type="checkbox" name='course' value='BSC' id='course' />BSC</label>
                    </div>

                    <div className={createStyle.uploadContainer}>
                        <Button type='file' component="label" variant='contained' startIcon={<BackupIcon sx={{ color: 'white' }} />} sx={{ width: '400px', marginBottom: '20px' }}>UPLOAD IMAGE
                            <VisuallyHiddenInput type='file' onChange={(e) => setImageUpload(e.target.files[0])} />
                        </Button>
                    </div>

                    <div className={createStyle.submitContainer}>
                        <Button variant='contained' sx={{ width: '400px' }} type='submit'> {createEmp._id ? "Update Employee" : "Create Employee"}</Button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CreateEmployee