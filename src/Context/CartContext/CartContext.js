import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'

export let CartContext=createContext()





export default function CartContextProvider({children}) {
    const [numofItems, setnumofItems] = useState(0)
    const [totalPrice, settotalPrice] = useState(0)
    const [products, setproducts] = useState(null)
    const [cartid, setcartid] = useState('')

useEffect(() => {
  getLocyoucart()
}, [])
  async  function addProductTocart(productId){




    try {
          let{data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:productId},{
            headers:{
                token:localStorage.getItem('userToken')

            }
        })
        if(data.status=='success'){
          getLocyoucart()
        }
        
        return data
    } catch (error) {
        console.log(error);
    }

    

    }

   async function getLocyoucart(){
      try {
        let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
          {
            headers:{
              token:localStorage.getItem('userToken')
            }
          }
        )
        console.log(data,"cartuser");
        if(data.status=='success'){
          setnumofItems(data.numOfCartItems)
          setproducts(data.data.products
          )
          settotalPrice(data.data.totalCartPrice)
          setcartid(data.data._id)
        }
        return data
        
      } catch (error) {
        setproducts([])
      }

    }

    async function removeitem(id){
      try {
        let{data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
          headers:{
            token:localStorage.getItem('userToken')
          }
        })
        if(data.status=='success'){
          setnumofItems(data.numOfCartItems)
          setproducts(data.data.products
          )
          settotalPrice(data.data.totalCartPrice)
        }

        return data
      } catch (error) {
        console.log(error);
      }
      
    }


    async function updatequint(id,count){
      try {
        let{data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count},{
          headers:{
            token:localStorage.getItem('userToken')
          }
        })
        if(data.status=='success'){

          setnumofItems(data.numOfCartItems)
          setproducts(data.data.products
          )
          settotalPrice(data.data.totalCartPrice)
        }
          
        
        return data
      } catch (error) {
        console.log(error);
      }
    }
     
 async function clearCart(){
    try {
    let{data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:{
          token:localStorage.getItem('userToken')
        }
      })
      if(data.message=='success'){

        setnumofItems(0)
        setproducts([])
       
        settotalPrice(0)
      }


      return data
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <CartContext.Provider value={{cartid,clearCart,addProductTocart,numofItems,totalPrice,products,removeitem,updatequint,setnumofItems,setproducts,settotalPrice}}>
    {children}
    
    </CartContext.Provider>
  )
}
