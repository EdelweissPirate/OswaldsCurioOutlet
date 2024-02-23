import { FaHome, FaUserAlt, FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './header.css'
import Coinpurse from '../Coinpurse/Coinpurse'

function Header() {
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)
    const { totalQuantity } = useSelector(state => state.cart)
    
    const handleNavigate = (e, dest) => {
        e.preventDefault()

        navigate(dest)
    }
    
    return (
        <>
        <header className='flex flex-center'>
            <div className='header-holder'>
                <div className='header-icon header-logo flex flex-center'>
                    <button onClick={e => {handleNavigate(e, '/')}}>
                        <FaHome className='font-white' />
                    </button>
                </div>

                <div className='header-icon header-login flex flex-center'>
                    <button onClick={e => {handleNavigate(e, user ? '/account' : '/login')}}>
                        {user ? 
                            <FaUserAlt className='font-green' />
                        :
                            <FaUserAlt className='font-white' />
                        }
                    </button>
                </div>

                <div className='header-icon header-cart flex flex-center'>
                    <button onClick={e => {handleNavigate(e, '/cart')}} >
                        <FaShoppingCart className='font-white' />
                        
                        {totalQuantity > 0 && user ?
                        <div id='cart-badge' className='badge badge-cart blip'>
                            <p>{totalQuantity < 100 ? totalQuantity : 99}</p>
                        </div>
                        : null
                    }
                    </button>
                </div>
            </div>
        </header>
        {user ?
            <Coinpurse {...user} />
        :
            null
        }
        </>
    )
}

export default Header