import axios from 'axios'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext/CartContext'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Payment() {

    let { cartid, setnumofItems, setproducts, settotalPrice } = useContext(CartContext)
    const [phone, setphone] = useState('')
    const [city, setcity] = useState('')
    const [details, setdetails] = useState('')
    let navigate = useNavigate()

    async function cachPayment() {

        let formdata = {
            shippingAddress: {
                details: details,
                phone: phone,
                city: city,
            }
        }
        try {
            let { date } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`, formdata,
                {
                    headers: {
                        token: localStorage.getItem('userToken')
                    }
                }


            )

            if (date.status == 'success') {
                settotalPrice(0)
                setproducts([])
                setnumofItems(0)

                navigate('/allorders')

            }


            console.log(date);
        } catch (error) {
            console.log(error);
        }





    }

    async function onlinePayment() {

        let formdata = {
            shippingAddress: {
                details: details,
                phone: phone,
                city: city,
            }
        }
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}`, formdata, {
                headers: {
                    token: localStorage.getItem('userToken')
                },
                params: {
                    url: 'http://localhost:3000'
                }
            })
            console.log(data);

            if (data.status == 'success') {
                window.open(data.session.url)
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>


            <Helmet>
                <meta charSet="utf-8" />
                <title>Payment Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className='w-50 m-auto my-4'>

                <label htmlFor="city">City</label>

                <input onChange={(e) => setcity(e.target.value)} type="text" id='city' name='city' className='form-control my-3' />


                <label htmlFor="phone">Phone</label>

                <input onChange={(e) => setphone(e.target.value)} type="tel" id='phone' name='phone' className='form-control my-3' />

                <label htmlFor="details">Details</label>

                <textarea onChange={(e) => setdetails(e.target.value)} name="details" id="details" className='form-control my-3'></textarea>
                <div className='d-flex justify-content-center align-items-center mt-5'>
                    <button onClick={() => { cachPayment() }} type='submit' className='btn btn-outline-success '>Cash Payment</button>
                    <button onClick={() => { onlinePayment() }} type='submit' className='btn btn-outline-info  mx-5'>Online Payment</button>
                </div>




            </div>

        </>
    )
}
