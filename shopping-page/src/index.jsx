import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios'
import NotFound from './components/NotFound/NotFound.jsx'

axios.interceptors.request.use(config=>{
  return config
}, error=>{
  return Promise.reject(error);
})

axios.interceptors.response.use(response=>{
  return response
},error=>{
  if (error.response.status !== 200) {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <NotFound/>
    );
  }
  return Promise.reject(error)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
