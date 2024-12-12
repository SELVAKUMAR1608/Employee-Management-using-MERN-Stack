import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react'

function updateModal() {
  return (
    <div>
        <div className='modal'>
            <div className="modal_container">
                <div className='Message'>
                <h3>Updating Details Please wait...</h3>
                </div>
                
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>



        </div>
    </div>
  )
}

export default updateModal