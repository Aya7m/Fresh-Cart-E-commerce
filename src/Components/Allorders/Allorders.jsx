
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { LineWave } from 'react-loader-spinner';

export default function Allorders() {
    const userId = jwtDecode(localStorage.getItem('userToken')).id
    const [alldata, setalldata] = useState(null)
    async function getAllorders() {

        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)


            console.log(data);
            setalldata(data)
        } catch (error) {
            console.log(error);
        }
    }
    console.log(userId);

    useEffect(() => {
        getAllorders()
    }, [])

    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>All Orders</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <div className='container py-5'>
                <div className="row g-5">
                    {alldata ? alldata.map((ele, ind) => {
                        return <div key={ind} className="col-md-6">
                            <div className="inner p-3 bg-main text-white rounded ">
                                <h4>payment Type :{ele.paymentMethodType}</h4>
                                <div className=''>
                                    <h4>Order Details</h4>



                                    <p>is delevery:{ele.isDelivered}</p>
                                    <p>isPaid {ele.isPaid}</p>

                                </div>

                                <div className="row">
                                    {ele.cartItems.map((ite) => {
                                        return <div className="col-md-4">
                                            <img src={ite.product.imageCover} className='w-100' alt="" />
                                            <p>{ite.product.title.split(' ').slice(0, 2).join(' ')}</p>
                                        </div>
                                    })}

                                </div>


                            </div>
                        </div>
                    }) : <div className='vh-100 d-flex justify-content-center align-items-center'>
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

                </div>

            </div>
        </>
    )
}
