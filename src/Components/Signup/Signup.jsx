import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Register() {
 const [errmes, setErrmes] = useState('') 
 const [loading, setloading] = useState(true)
 let navigate=useNavigate()

 
   function sendData(values) {
    setloading(false)
    

        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({data})=>{
        console.log(data);
        if(data.message=='success'){
           navigate('/login')
        }
       
       }).catch((error)=>{
        
        setErrmes(error.response.data.message)
        setloading(true)
       })
     
    

  }

  let validationSchema = Yup.object({
    name: Yup.string().required("the input is requird").min(3, "min length is 3 char").max(10, "max length is 10 char"),
    email: Yup.string().required("the input is requird").email(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "enter valid email"),
    password: Yup.string().required("the input is requird").matches(/^[A-Z][a-z0-9]{3,8}$/, "enter valid password"),
    rePassword: Yup.string().required("the input is requird").oneOf([Yup.ref("password")], "enter same password"),
    phone: Yup.string().required("the input is requird").matches(/^01[0125][0-9]{8}$/, "enter EG phone")

  })

  let formik = useFormik({



    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    }, validationSchema,
    onSubmit:(values)=>{
      console.log(values);
      sendData(values)
    },
  })
  return (
    <>
      <div className="container">

        <div className='w-75 mx-auto mt-5'>
       
          <h1 className='py-4'>Register now</h1>
          <form onSubmit={formik.handleSubmit} >

            <label htmlFor="name">Name:</label>
            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='name' className='form-control mt-3' />
            {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ""}


            <label htmlFor="email">Email:</label>
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' className='form-control mt-3' />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}


            <label htmlFor="password">Password:</label>
            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='password' className='form-control mt-3' />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}


            <label htmlFor="repassword">Re-password:</label>
            <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='rePassword' className='form-control mt-3' />
            {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ""}


            <label htmlFor="phone">Phone:</label>
            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id='phone' className='form-control mt-3' />
           
            {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}
            
            {errmes?<div className="alert alert-danger mt-1">{errmes}</div>:''}
            <div className='d-flex justify-content-center align-items-center'>
              <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main mt-5 text-white  px-4 py-2 rounded-2'>
                {loading?"Register":<i className="fa fa-spinner fa-spin"></i>}
              </button>
            </div>
            


          </form>
        </div>

      </div>

    </>
  )
}
