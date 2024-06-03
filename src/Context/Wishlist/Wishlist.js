import axios from "axios";
import { createContext, useEffect, useState } from "react";

import React from 'react'
import { date } from "yup";
export let WishlistContext = createContext()




export default function WishlistProvider({ children }) {
    const [count, setcount] = useState(0)
    const [product, setproduct] = useState(null)
    useEffect(() => {
        getUserWish()
    }, [])

    async function addtoWish(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: productId },
                {
                    headers: {
                        token: localStorage.getItem('userToken')
                    }
                }

            )
            if (data.status == 'success') {
                getUserWish()
            }
            return data

        } catch (error) {
            console.log(error);
        }
    }


    async function getUserWish() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            })
            console.log(data);
            if(data.status=='success'){
                setcount(data.count
                )
                setproduct(data)
            }
            return date
        } catch (error) {
            console.log(error);

        }
    }

   async function removeWish(id){
        try {
            let{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            {
                headers:{
                    token: localStorage.getItem('userToken')
                }
            }
        )
        if(data.status=='success'){
            setcount(data.count)
            setproduct(data)
        }
        return data
        } catch (error) {
            console.log(error);
        }
        
    }





    return (
        <WishlistContext.Provider value={{ addtoWish, setcount, count,getUserWish,product,removeWish
        }}>
            {children}

        </WishlistContext.Provider>
    )
}
