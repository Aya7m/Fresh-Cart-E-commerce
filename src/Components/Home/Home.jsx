import React, { useContext, useEffect, useState } from 'react'
import Mainslider from '../Mainslider/Mainslider'
import Catagory from '../Catagory/Catagory'
import axios from 'axios'
import { Hearts, LineWave } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext/CartContext'
import { WishlistContext } from '../../Context/Wishlist/Wishlist'
import { Helmet } from 'react-helmet'

export default function Home() {
  let { addProductTocart } = useContext(CartContext)
  let { addtoWish } = useContext(WishlistContext)


  async function addwish(id) {
    let res = await addtoWish(id)
    console.log(res, "wiah");
    if (res.status == 'success') {
      toast.success(res.message, {
        duration: 1500,
        position: "top-right"
      })

    } else {
      toast.error("errr", {
        duration: 1500,
        position: "top-left"
      })
    }

  }

  async function addToCart(id) {
    let res = await addProductTocart(id)
    console.log(res);

    if (res.status == 'success') {
      toast.success(res.message, {
        duration: 1500,
        position: "top-right"
      })

    } else {
      toast.error("errr", {
        duration: 1500,
        position: "top-left"
      })
    }
  }

  // const [products, setproducts] = useState(null)

  async function getAllproduct() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)

  }

  let { isError, isLoading, data } = useQuery('products', getAllproduct)
  console.log(data?.data.data);

  // async function getAllproduct() {
  //   let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //   console.log(data.data);
  //   setproducts(data.data)
  // }

  // useEffect(() => {
  //   getAllproduct()
  // }, [])
  if (isLoading == true) {
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

      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <Mainslider />
      <Catagory />

      {data?.data.data ? <div className='container mt-5'>
        <div className="row">
          {data?.data.data ? data?.data.data.map((ele, idx) =>
            <div key={idx} className="col-md-3 inn g-5 ">
              <Link to={'/productdetails/' + ele._id} className="inner   ">
                <img src={ele.imageCover} className='w-100' alt="" />
                <h5 className='text-center my-2'>{ele.category.name}</h5>






              </Link>
              <div className='d-flex justify-content-between align-items-center'>
                <h4 className='text-main'>{ele.price} EGP</h4>
                <i onClick={() => {
                  addwish(ele._id)
                }} className='fa fa-heart fs-3'></i>

              </div>
              <button onClick={() => {
                addToCart(ele._id)
              }} className='btn bg-main text-white w-100 my-2 '>Add To Cart</button>

            </div>
          ) : ''}

        </div>

      </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>
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

      </div>}






    </>
  )
}
