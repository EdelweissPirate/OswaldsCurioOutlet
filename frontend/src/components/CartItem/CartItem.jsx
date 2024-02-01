import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { removeItem } from "../../features/cart/cartSlice"

import './cartItem.css'

function CartItem(props) {
    const item = {...props}
    
    const [quantity, setQuantity] = useState(item.quantity)

    const { currency } = useSelector(state => state.data)

    const dispatch = useDispatch()

    useEffect(() => {
        // console.log('cart item refreshed');
    }, [quantity])
    

    const handleChange = (e) => {
        console.log(e.target.value);
        setQuantity(e.target.value)
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const data = {
            ...item,
            quantity
        }

        // console.log(data);
        dispatch(removeItem(data))
    }

    return (
        <li className="flex row w-fill cart-product list-bg w-fill py-1">
            <div className="cart-product-image">
                {/* <img src={item.image} alt='product image' /> */}
            </div>
            <div className="cart-product-name">
                <h3>{item.name}</h3>
            </div>
            <div className="cart-product-price">
                <h3>{item.price + ' ' + currency}</h3>
            </div>
            <div className="cart-product-total-price">
                <h3>{item.totalPrice + ' ' + currency}</h3>
            </div>
            <div className="cart-product-quantity">
                <input type={'number'} value={quantity} onChange={handleChange} min={0} />
            </div>
            <div className="cart-product-update">
                <button className="btn-long border round-corners hover-button-rev" onClick={handleUpdate}>
                    UPDATE
                </button>
            </div>
        </li>
    )
}

export default CartItem