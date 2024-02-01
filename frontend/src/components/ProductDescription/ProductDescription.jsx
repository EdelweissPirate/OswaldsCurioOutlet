import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, reset } from '../../../../frontend/src/features/cart/cartSlice';

import Wrapper from '../../../../frontend/src/components/Wrapper/Wrapper';

import PropTypes from "prop-types";

import './productDescription.css'

function ProductDescription({ data }) {
    const [quantity, setQuantity] = useState(1)
    
    const { name, desc, cost, equipment_category } = data
    const { currency } = useSelector(state => state.data)
    const { cartContents } = useSelector(state => state.cart)

    const image = "https://placehold.co/350x485"

    const dispatch = useDispatch()

    useEffect(() => {    
        dispatch(reset())
    }, [cartContents, dispatch])
    
    
    const handleAdd = (e) => {
        e.preventDefault()

        const itemToAdd = {
            id: data.index,
            name,
            category: data.equipment_category,
            price: data.cost.quantity,
            image: null,//data.image,
            quantity,
            totalPrice: Math.floor(Number(data.cost.quantity) * quantity)
        }

        dispatch(addItem(itemToAdd))

        const cartBadge = document.querySelector('#cart-badge')
        
        if(cartBadge){
            cartBadge.classList.remove('blip')
        
            setTimeout(() => {
                cartBadge.classList.add('blip')
            }, 100)
        }
    }
    
    return (
        <div id='product-description' className="container h-fill m-auto fade-in">
            {data ? 
                <Wrapper>
                    <div className="m-auto grid info-grid">
                        
                        <div className="description-title">
                            <h2 className='w-fill my-1'>{name}</h2>
                            <div>
                                {equipment_category.name}    
                            </div>
                        </div>
                        
                        <div className="description-image"><img src={image} /></div>

                        <div className="add-to-cart bordered-title">
                            {cost?
                                <>
                                    <div className="description-price">
                                        <p>{cost.quantity} {currency}</p>
                                    </div>
                                    
                                    <div className='quantity-input flex col'>
                                        <label>Quantity</label>
                                        <div className="w-fill">
                                            <input type="number"  name="quantity" min="1" step="1" value={quantity} onChange={e => setQuantity(e.target.value)} ></input>
                                        </div>
                                    </div>

                                    <button className="hover-button-rev btn flex flex-center border round-corners w-10" onClick={handleAdd}>ADD TO CART</button>
                                </>
                            :
                                <h3 className='py-1 txt-center'>
                                    Not in stock.
                                </h3>
                            }
                        </div>
                    

                        {desc.length > 0? 
                            <div className="description-info flex flex-center col">
                                <h3 className='py-1 bordered-title txt-center'>Description</h3>
                                <div>
                                    {desc.map((el, i) => {
                                        if(i === 0){
                                            return (
                                                <p key={'desc_' + i} className='my-half txt-left'>
                                                    <span style={{fontStyle:"italic"}}>
                                                        {el}
                                                    </span>
                                                </p>
                                            )
                                        } else {
                                            return (
                                                <p key={'desc_' + i} className='my-half txt-left'>{el}</p>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        :
                            null
                        }

                        <div className="description-review flex flex-center col">
                            {/* <h3 className='py-1'>Rarity</h3> */}
                            {/* TODO */}
                            {/* {stars.map((item, i) => {
                                const _stars = new Array(item.rarity).fill(0)
                                
                                return (
                                    <div key={item + i} className='flex col' >
                                        <h4>{item.author}</h4>
                                        <h5>{item.date}</h5>
                                        <div className='review-stars flex row'>
                                            {_stars.map((star, i) => {
                                                return <FaStar  key={item.author + '_star_' + i} />
                                            })}
                                        </div>
                                        <p>{item.content}</p>
                                    </div>
                                )
                            })} */}
                        </div>
                    </div>
                </Wrapper>
                :
                "Getting item info..."
            }
        </div>
    )
}

ProductDescription.propTypes = {
    data: PropTypes.object
}

export default ProductDescription