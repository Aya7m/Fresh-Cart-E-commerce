import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authContext } from '../../Context/Auth/Auth';
import { Helmet } from 'react-helmet';



export default function Login() {




  const [errmes, setErrmes] = useState('')
  const [loading, setloading] = useState(true)
  let navigate = useNavigate()

  function sendData(values) {
    setloading(false)


    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({ data }) => {
      console.log(data);
      if (data.message == 'success') {
        console.log(data.token);
        localStorage.setItem('userToken', data.token)

        navigate('/home')
      }

    }).catch((error) => {

      setErrmes(error.response.data.message)
      setloading(true)
    })



  }

  let validationSchema = Yup.object({

    email: Yup.string().required("the input is requird").email(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "enter valid email"),
    password: Yup.string().required("the input is requird").matches(/^[A-Z][a-z0-9]{3,8}$/, "enter valid password"),


  })

  let formik = useFormik({



    initialValues: {

      email: '',
      password: '',

    }, validationSchema,
    onSubmit: (values) => {
      console.log(values);
      sendData(values)
    },
  })
  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container">

        <div className='w-75 mx-auto mt-5'>

          <h1 className='py-4'>Register now</h1>
          <form onSubmit={formik.handleSubmit} >




            <label htmlFor="email">Email:</label>
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' className='form-control mt-3' />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}


            <label htmlFor="password">Password:</label>
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='password' className='form-control mt-3' />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}







            <div className='d-flex justify-content-center align-items-center'>
              <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main mt-5 text-white  px-4 py-2 rounded-2'>
                {loading ? "Login" : <i className="fa fa-spinner fa-spin"></i>}
              </button>
            </div>



          </form>
        </div>

      </div>

    </>
  )
}
