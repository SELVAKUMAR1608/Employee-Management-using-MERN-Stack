import React from 'react'
import '../src/css/popup.css'

function DeleteModal({onConfirm,onCancel}) {
  return (
      <div className='modal'>
        <div className='modal_container'>
            <div className='Message'>
                <h3> Are you sure want to Delete ?</h3>
            </div>
            <div className="btn_container">
                <button className='delete_btn' onClick={onConfirm}>YES</button>
                <button className='cancel_btn' onClick={onCancel}>NO</button>
            </div>
        </div>

    </div>
  )
}

export default DeleteModal