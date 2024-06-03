import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { LineWave } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { date } from 'yup'

export default function Brands() {

  async function getAllbrands() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)

  }
  let { data, isLoading } = useQuery('brand', getAllbrands)
  console.log(data?.data.data);

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
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container my-5">
        <div className="row g-3">

          {data?.data.data.map((bra) => {
            return <div className="col-md-3">
              <div className="inner border border-1 product">
                <img src={bra.image} className='w-100' alt="" />
                <h5 className='text-center'>{bra.name}</h5>
              </div>
            </div>
          })}


        </div>
      </div>

    </>
  )
}
