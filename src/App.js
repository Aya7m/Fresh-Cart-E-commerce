import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Mainslider from './Components/Mainslider/Mainslider'
import Catagory from './Components/Catagory/Catagory'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Catagories from './Components/Catagories/Catagories'
import Login from './Components/Login/Login'
import Wishlist from './Components/Wishlist/Wishlist'
import Signup from './Components/Signup/Signup'
import Authlay from './Components/Layout/Authlay'
import Notfound from './Components/Notfound/Notfound'
import { Offline, Online } from "react-detect-offline";

import ProtectetRouts from './ProtectetRouts/ProtectetRouts'
import { QueryClient, QueryClientProvider } from 'react-query'
import Productdetails from './Components/Productdetails/Productdetails'
import AuthProvider from './Context/Auth/Auth'
import CartContextProvider from './Context/CartContext/CartContext'
import WishlistProvider from './Context/Wishlist/Wishlist'
import { Toaster } from 'react-hot-toast'
import Payment from './Components/Payment/Payment'
import Allorders from './Components/Allorders/Allorders'
import Vertife from './Components/Vertif/Vertife'

export default function App() {
  
  let quireClient=new QueryClient()
  let routers = createBrowserRouter([
    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <ProtectetRouts> <Home /></ProtectetRouts>},
        { path: 'home', element: <ProtectetRouts><Home /></ProtectetRouts> },
        { path: 'products', element:  <ProtectetRouts><Products /></ProtectetRouts>},
        { path: 'catagories', element:<ProtectetRouts> <Catagories /></ProtectetRouts> },
        { path: 'cart', element: <ProtectetRouts> <Cart /></ProtectetRouts>},
        { path: 'vertif', element: <ProtectetRouts> <Vertife /></ProtectetRouts>},
        { path: 'allorders', element: <ProtectetRouts> <Allorders /></ProtectetRouts>},
        { path: 'payment', element: <ProtectetRouts> <Payment /></ProtectetRouts>},
        { path: 'wishlist', element: <ProtectetRouts><Wishlist /></ProtectetRouts> },
        { path: 'brands', element: <ProtectetRouts> <Brands /></ProtectetRouts>},
        { path: 'productdetails/:id', element: <ProtectetRouts> <Productdetails /></ProtectetRouts>},
        { path: '*', element: <Notfound /> },
      ]

    },

    {
      path: '/', element: <Authlay />, children: [

        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
      ]

    }

  ])
  return (
    <>
  
    < QueryClientProvider client={quireClient}>
      <Toaster/>
      < CartContextProvider>
      <WishlistProvider>
        <AuthProvider>
        <Online>
          <RouterProvider router={routers} />
        </Online>
  

      <Offline>
        <div className='offline'>
          <i className="fa-solid fa-wifi mx-2"></i>
          Only shown offline (surprise!)
        </div>
      </Offline>
   </AuthProvider>
   </WishlistProvider>
   </CartContextProvider>
</QueryClientProvider>

    </>
  )
}
