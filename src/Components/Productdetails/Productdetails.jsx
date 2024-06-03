
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { LineWave } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext/CartContext'
import toast, { Toaster } from 'react-hot-toast';

import { WishlistContext } from '../../Context/Wishlist/Wishlist'


export default function Productdetails() {
    let { addProductTocart } = useContext(CartContext)
    let { addtoWish } = useContext(WishlistContext)

    async function addwish(id) {
      let res=  await addtoWish(id)
      console.log(res,"wiah");
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

    //    useEffect(() => {
    //    addToCart()
    //    }, [])



    let { id } = useParams()
    async function getProductDetails() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

    }
    let { data, isLoading } = useQuery('productDetails', getProductDetails)
    console.log(data);

    var settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1500,

    };
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
            <div className='container my-5'>
                <div className="row">
                    <div className="col-md-4">

                        <Slider {...settings}>

                            {data?.data.data.images
                                .map((ele, ind) => <img key={ind} src={ele} className='w-100' alt={data?.data.data.title} />)}


                        </Slider>

                    </div>
                    <div className="col-md-8">
                        <h6>{data?.data.data.description}</h6>
                        <h4>{data?.data.data.price} EGP</h4>
                        <h4 className='text-main'>{data?.data.data.category.name}</h4>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h5>Brand Name: {data?.data.data.brand.name}</h5>
                            <img src={data?.data.data.brand.image} alt="" />
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <button onClick={() => {
                                addToCart(data?.data.data.id)
                            }} className='btn bg-main text-white w-75'>Add To Cart</button>
                            <i onClick={()=>{
                                addwish(data?.data.data._id)
                            }} className='fa fa-heart fs-2'></i>
                        </div>



                    </div>
                </div>

            </div>
        </>
    )
}
