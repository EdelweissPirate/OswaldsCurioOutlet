import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
// import { toast } from "react-toastify"

import CartItem from "../CartItem/CartItem"
import Wrapper from "../Wrapper/Wrapper"

import { reset } from "../../features/cart/cartSlice";

import './cartContents.css'

function CartContents() {
    const [items, setItems] = useState(null)

    const { currency } = useSelector(state => state.data)
    const { cartContents, cartPrice } = useSelector(state => state.cart)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const generateCartItems = (arr) => {
        return arr.map((item) => {
            return (
                <CartItem key={item.name} {...item} />
            )
        })
    }

    useEffect(() => {
        dispatch(reset())
        
        setItems(
            generateCartItems(cartContents)
        )
    }, [cartContents, cartPrice, currency])

    const handleNavigate = (e, dest) => {
        e.preventDefault()

        navigate(dest)
    }

    return (
            <Wrapper>
                <div className="cart-contents m-auto">
                    <h2 className="cart-title spacer">CART</h2>

                    {items?.length > 0 ? 
                        <>
                            <div className="cart-key flex flex-center w-fill row space-between txt-center">
                                <div className="cart-product-image">
        
                                </div>
                                <div className="cart-product-name">
                                    <h4>Product name</h4>
                                </div>
                                <div className="cart-product-price">
                                    <h4>Product price</h4>
                                </div>
                                <div className="cart-product-total-price">
                                    <h4>Product total</h4>
                                </div>
                                <div className="cart-product-quantity">
                                    <h4>Quantity</h4>
                                </div>
                                <div className="cart-product-update">
                                    
                                </div>
                            </div>
        
                            <ul className="cart-list px-1">
                                {items}
                            </ul>
                        </>
                        : 
                        <div className=" spacer w-fill txt-center"><h2>Nothing in cart yet!</h2></div>
                    }

                    <div className="flex col">
                        <div className="spacer flex col flex-end">
                            {items?.length > 0 ?
                                <>
                                    <div className="flex flex-center col txt-center">
                                        <h3>Subtotal: {cartPrice + ' ' + currency}</h3>
                                        <aside>Shipping and tax calculated at checkout</aside>
                                    </div>
                                    <button 
                                        className="m-1 btn-long border round-corners hover-button-rev" 
                                        onClick={e => handleNavigate(e, '/checkout')}
                                        // onClick={e => {toast.error('Not implemented')}}
                                    >
                                        CHECKOUT
                                    </button>
                                </>
                                : null
                            }
                            <button 
                                className="m-1 btn-long border round-corners hover-button-rev" 
                                onClick={e => handleNavigate(e, '/categories')}
                            >
                                CONTINUE SHOPPING
                            </button>
                        </div>
                    </div>
                </div>
            </Wrapper>
    )
}

export default CartContents