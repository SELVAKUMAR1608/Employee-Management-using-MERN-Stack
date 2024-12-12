import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react'

function CreateModal({onCancel}) {
    return (
        <div className='modal'>
            <div className="modal_container">
                <div className='Message'>
                <Box sx={{display:"flex",justifyContent:"flex-end",marginRight:"-40px",marginBottom:"20px",cursor:"pointer"} } onClick={onCancel}>
                <ClearIcon/>
                </Box>

                <h3>Creating Details Please wait...</h3>
               
                </div>
                
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>



        </div>
    )
}

export default CreateModal