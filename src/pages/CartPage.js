import React from 'react'
import Layout from '../components/Layout/Layout.js'
import { useAuth } from '../context/auth.js'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart.js'
const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()


    const totalPrice = () => {
        let total = 0
        cart?.map((item) => { total = total + item.price })
        return total.toLocaleString("en-us", {
            style: "currency",
            currency: "INR"
        })
    }

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
    const navigate = useNavigate();
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 0
                                ? `You have ${cart?.length} items in your cart 
                            ${auth?.token
                                    ? "" : "Please Login to checkout"}`
                                : "Your Cart is Empty"}
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {cart?.map((p) => (
                            <div className='row mb-3 p-3 card flex-row'>
                                <div className='col-md-4'>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                </div>
                                <div className='col-md-8'>
                                    <h5>{p.name}</h5>
                                    <p>{p.description.substring(0, 30)}...</p>
                                    <h6>&#x20B9; {p.price}</h6>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-4 text-center'>
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className='mb-3'>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='mb-3'>
                                    {auth?.token ? (
                                        <button className='btn btn-outline-warning'
                                            onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                    ) : (
                                        <button className='btn btn-outline-warning'
                                            onClick={() => navigate('/login', { state: cart })}>Login to Checkout</button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage