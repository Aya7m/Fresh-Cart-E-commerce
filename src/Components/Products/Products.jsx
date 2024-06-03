import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';

import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

export default function Products() {

  function getProduct() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let { data, isError, isFetching, isLoading } = useQuery('getProduct', getProduct, {
    // refetchInterval: 5000,
    // staleTime: 3000,
  })
  console.log(data?.data.data);

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
  return (

    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Products Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>



      {isLoading ? <div className='w-100 d-flex justify-content-center align-items-center py-5'>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />

      </div> : <div className="container py-5 my-5 ">
        {/* <input type="text" className='form-control w-75 mx-auto' placeholder='search...' /> */}
        <div className="row mt-5 py-5">
          {data?.data.data.map((element) =>
            <div key={element.id} className=" mt-5 w-75 mx-auto">
              <div className='row g-5'>
                <div className="product cursor-pointer px-4 d-flex justify-content-center align-items-center g-4">
                  <div className="col-md-7">

                    <img src={element.imageCover} className='w-100' alt="" />
                    <p className='text-main text-center'>{element.category.name}</p>
                    <div className='d-flex justify-content-between align-items-center my-3'>

                      <h5 className=' mt-2 mx-auto text-center'>{element.title.split(' ').splice(0, 2).join(' ')}</h5>


                    </div>
                    <h5 className='mx-auto '>brand name:{element.brand.name}</h5>

                    <div className='d-flex justify-content-between align-items-center '>
                      <p>{element.price} EGP</p>



                      <p> {element.ratingsAverage}  <i className='fa fa-heart text-warning'></i></p>
                    </div>




                  </div>


                  <div className="col-md-5">
                    <Slider {...settings}>

                      {element.images
                        .map((ele, ind) => <img key={ind} src={ele} className='w-100' alt={data?.data.data.title} />)}







                    </Slider>
                  </div>













                </div>

              </div>

            </div>



          )}




        </div>
      </div>}








    </>
  )
}
