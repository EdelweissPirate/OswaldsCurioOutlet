import { FaBackward } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import './backbutton.css'

function BackButton() {
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()

        navigate(-1)
    }

    return (
        <button className='back-icon' onClick={handleClick}>
            <FaBackward />
        </button>
    )
}

export default BackButton