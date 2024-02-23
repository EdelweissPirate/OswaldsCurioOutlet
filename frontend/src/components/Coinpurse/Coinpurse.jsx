import { FaCoins } from 'react-icons/fa'

import './coinpurse.css'

function Coinpurse(props) {
    const user = {...props}

    return (
        <div className='coinpurse slide-fade'>
            <div className="coinpurse-copper flex flex-center row">
                <h4 style={{paddingRight:'.5rem'}}>{Math.round(((user.gold - Math.floor(user.gold)) * 100) % 10)}</h4>
                <FaCoins style={{ color: '#b87333' }} />
            </div> 
                <div className="coinpurse-silver flex flex-center row">
                <h4 style={{paddingRight:'.5rem'}}>{Math.floor((user.gold - Math.floor(user.gold)) * 100 / 10)}</h4>
                <FaCoins style={{ color: '#c0c0c0 ' }} />
            </div> 
            <div className="coinpurse-gold flex flex-center row">
                <h4 style={{paddingRight:'.5rem'}}>{Math.floor(user.gold)}</h4>
                <FaCoins style={{ color: '#FFD700' }} />
            </div>
        </div>
    )
}

export default Coinpurse