import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext/CartContext'
import { LineWave } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  let { clearCart, addProductTocart, numofItems, totalPrice, products, removeitem, updatequint } = useContext(CartContext)
  console.log(products);

  async function removeFromCart(id) {
    let res = await removeitem(id)
    if (res.status == 'success') {
      toast.success("remove item from cart", {
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

  async function updateCou(id, count) {
    let res = await updatequint(id, count)
    if (res.status == 'success') {
      toast.success("count update successfuly", {
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


  async function clearCartUser() {
    await clearCart()
  }

  if (products == null) {
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


  if (products.length == 0) {
    return <div className='vh-100 d-flex justify-content-center align-items-center'>
      <h1>NO DATA TO DISPLAY</h1>

    </div>
  }

  return (

    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      
      <div style={{ backgroundColor: '#eee' }} className='container pt-5'>
        <h2>shop cart :</h2>
        <h3 className='text-main'>{totalPrice}</h3>
        <button onClick={clearCartUser} className=' btn btn-warning'>Clear Cart</button>
        <Link className=' btn bg-main text-white mx-3' to={'/payment'}>Payment</Link>

        {products.map((ele, idx) => {
          return <div key={idx} className="row align-items-center border-bottom border-1 py-3 g-3">
            <div className="col-sm-1">
              <img src={ele.product
                .imageCover} className='w-100' alt="" />

            </div>
            <div className="col-sm-8">
              <h4>{ele.product
                .title}</h4>
              <h6>{ele.price} EGP</h6>
              <i onClick={() => {
                removeFromCart(ele.product.id)
              }} class="fa-solid fa-trash text-danger fs-4"></i>

            </div>
            <div className="col-sm-3">
              <div className='d-flex align-items-center'>
                <button onClick={() => {
                  updateCou(ele.product.id, ele.count + 1)
                }} className='btn btn-outline-success'>+</button>
                <span className='mx-2'>{ele.count
                }</span>

                {ele.count <= 0 ? <button onClick={() => {
                  removeFromCart(ele.product.id)
                }} className='btn btn-outline-danger'>-</button> : <button onClick={() => {
                  updateCou(ele.product.id, ele.count - 1)
                }} className='btn btn-outline-danger'>-</button>}

              </div>

            </div>


          </div>
        })}

      </div>

    </>
  )
}
