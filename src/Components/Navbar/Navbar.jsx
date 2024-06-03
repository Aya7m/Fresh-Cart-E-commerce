import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from './../../images/freshcart-logo.svg'
import { authContext } from '../../Context/Auth/Auth'
import { CartContext } from '../../Context/CartContext/CartContext'
import { WishlistContext } from '../../Context/Wishlist/Wishlist'
export default function Navbar() {
    let { setToken } = useContext(authContext)
    let { numofItems } = useContext(CartContext)
    let { count } = useContext(WishlistContext)
    let navigate = useNavigate()
    function logout() {

        localStorage.removeItem('userToken')
        setToken(null)
        navigate('/login')

    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid mx-3">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to={'/home'}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/products'}>Products</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/catagories'}>Catagories</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/brands'}>Brands</NavLink>
                            </li>


                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/allorders'}>All Orders</NavLink>
                            </li>
                        </ul>



                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item ">
                                <NavLink className="nav-link position-relative" to={'/cart'}>Cart

                                    <i class="fa-solid fa-cart-shopping fs-3 mx-2"></i>

                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {numofItems}
                                        <span class="visually-hidden">unread messages</span>
                                    </span>
                                </NavLink>



                            </li>

                            <li className="nav-item ">
                                <NavLink className="nav-link position-relative" to={'/wishlist'}>Wishlist

                                    <i class="fa-solid fa-heart fs-3 mx-2"></i>

                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {count
                                        }
                                        <span class="visually-hidden">unread messages</span>
                                    </span>
                                </NavLink>



                            </li>

                            <li className="nav-item">
                                <span onClick={logout} style={{ cursor: 'pointer' }} className="nav-link" href="#">Logout</span>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}
