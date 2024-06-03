
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectetRouts({children}) {
    let token=localStorage.getItem('userToken')
    if(token) return children

  return <Navigate to={'/signin'}/>

}
   
    
   
