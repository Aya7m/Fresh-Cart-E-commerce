import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
export default function Catagory() {
  const [catagory, setcatagory] = useState([])

  async function getcatagory(){
     let{data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
     setcatagory(data.data)
     console.log(data.data);
   }
   useEffect(() => {
   getcatagory()
   }, [])
   
   var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1500,
  };
  return (
    <div className='my-3 '>
      <h2>show popular catagory</h2>
       <Slider {...settings}>
    {catagory.map((ele)=>(
    <div className='px-1'>
       <img src={ele.image} className='w-100  'height={300} alt="" />
       <h5>{ele.name}</h5>
    </div>
     
    )
      
      
     
   
    
       
    )}
   
   
    </Slider>
    </div>
   
   
  )
}
