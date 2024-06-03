import { createContext, useState } from "react";
import React from 'react'

export let authContext=createContext()




export default function AuthProvider({children}) {
    const [token, setToken] = useState(null)
  return (
    <authContext.Provider value={{token,setToken}}>
    {children}
    
    </authContext.Provider>
  )
}
