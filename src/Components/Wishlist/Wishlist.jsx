import React, { useContext, useEffect } from 'react'
import { WishlistContext } from '../../Context/Wishlist/Wishlist'
import toast from 'react-hot-toast';
import { LineWave } from 'react-loader-spinner';

export default function Wishlist() {
 let{product,removeWish}= useContext(WishlistContext)
 console.log(product);

 async function removeFromWish(id){
  let res=await removeWish(id)
  if (res.status == "success") {
    toast.success(res.message, {
      duration: 1500,
      position: "top-right"
    })

  }
 }
 if (product == null) {
  return <div className='vh-100 d-flex justify-content-center align-items-center'>
    <LineWave
      visible={true}
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="line-wave-loading"
      wrapperStyle={{}}
      wrapperClass=""
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />

  </div>
}




 
  return (
   <>
   
    <div className='container my-5'>
      <h2 className='text-main my-5'>wish List <i className='fa fa-heart'></i></h2>
      {product?.data.map((ele)=><div className="row border-bottom border-1 align-items-center g-4">
        <div className="col-md-3">
          <img src={ele.imageCover} className='w-100' alt="" />
        </div>
        <div className="col-md-9">
          <h6>{ele.description}</h6>
          <h3>{ele.price} EGP</h3>
          <h4>{ele.title}</h4>
          <i onClick={()=>{
            removeFromWish(ele.id)
          }} className="fa-solid fa-heart fs-3 text-main"></i>
        </div>
      </div>)}
  
    </div>

   
   
   </>
  )
}
