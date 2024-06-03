import React from 'react'


import Slider from "react-slick";
import sli1 from '../../images/0gb8sv9d.png'
import sli2 from '../../images/alp3aj6c.png'
import sli3 from '../../images/fxj3rwof.png'
import sli4 from '../../images/pvuj0f8s.png'
import sli5 from '../../images/ur0lciyq.png'
export default function Mainslider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1500,
      };
  return (
    <>
     <Slider {...settings}>
      <img src={sli1} alt="" />

    <img src={sli2} alt="" />
    <img src={sli3} alt="" />
    <img src={sli4} alt="" />
    <img src={sli5} alt="" />
   
   
    </Slider>
    
    </>
  )
}
