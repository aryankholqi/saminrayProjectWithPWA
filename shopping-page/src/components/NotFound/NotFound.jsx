import React from 'react'
import "./NotFound.css"
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function NotFound() {
  return (
    <div className='not-found-page text-white d-flex justify-content-center align-items-center flex-column'>
        <h1><ReportProblemIcon sx={{fontSize:"2.5rem",paddingBottom:"0.1rem"}}/> Error</h1>
        <h4>! Something Went Wrong</h4>
    </div>
  )
}
