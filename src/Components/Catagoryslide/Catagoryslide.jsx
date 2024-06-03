import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CatagorySlide() {
    const [catagory, setcatagory] = useState([])

   async function catagory(){
      let{data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      setcatagory(data.data)
      console.log(data.data);
    }
    useEffect(() => {
    catagory()
    }, [])
    
  return (
    <div>CatagorySlide</div>
  )
}
