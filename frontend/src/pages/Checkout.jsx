import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CommonContainer from '../components/CommonContainer/CommonContainer'
import Wrapper from '../components/Wrapper/Wrapper'
import Helmet from '../components/Helmet/Helmet'

import { reset, doPurchase, emptyCart } from '../features/cart/cartSlice'
import { getUser } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Checkout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)
    const { currency } = useSelector(state => state.data)
    const { cartContents, cartPrice, isSuccess, isError, isLoading, message } = useSelector(state => state.cart)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            toast.success(message)
            dispatch(emptyCart())
            dispatch(getUser(user))
            navigate('/')
        }

        dispatch(reset())
    }, [user, isSuccess, isError, dispatch, navigate, message])

    const handlePurchase = (e) => {
        e.preventDefault()

        const data = {
            user,
            cart: {
                contents: cartContents,
                total: cartPrice
            }
        }
        
        dispatch(doPurchase(data))
    }

    return (
        <>
            <Helmet title='Checkout' />
            <section id='Checkout' className='slide-up' >
                <CommonContainer>
                    {isLoading?
                        <div className="flex flex-center col w-80 m-auto h-fill">
                            <div className='bordered-title txt-center w-fill my-1'>
                                <h1>Counting <br/> gold pieces...</h1> 
                            </div>
                        </div>
                    :
                    <Wrapper>
                        <div className="flex flex-center col w-80 m-auto">
                            <div className='bordered-title txt-center w-fill my-1'>
                                <h2>Checkout</h2>
                            </div>

                            <div className='flex row w-fill space-between'>
                                <div className='flex col'>
                                    <h3 className='my-1'>Current Gold Pieces: </h3>
                                    <h3 className='my-1'>Order Total: </h3>
                                    <h3 className='my-1'>Remaining Gold Pieces: </h3>
                                </div>
                                <div className='flex col flex-end'>
                                    <h3 className='my-1'>{user.gold + ' ' + currency}</h3>
                                    <h3 className='my-1'>{cartPrice + ' ' + currency}</h3>
                                    <h3 className='my-1'>{Math.floor(user.gold - cartPrice) + ' ' + currency}</h3>
                                </div>
                            </div>

                            <div className='w-fill my-1'>
                                {user.gold - cartPrice >= 0?
                                        <button 
                                        className="m-auto btn-long border round-corners hover-button-rev w-fill" 
                                        onClick={e => handlePurchase(e)}
                                    >
                                        CONFIRM PURCHASE
                                    </button>
                                :
                                    <div className=" spacer w-fill txt-center"><h2>Not enough gold</h2></div>
                                }
                            </div>
                        </div> 
                    </Wrapper>
                    }
                </CommonContainer>
            </section>
        </>
    )
}

export default Checkout