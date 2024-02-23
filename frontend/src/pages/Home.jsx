import Helmet from '../components/Helmet/Helmet'
import Title from '../components/Title'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { switchClass } from '../utils'

function Home() {
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }

        switchClass(document.getElementById('home'))
    }, [])

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        
    }, [user, navigate])

    const handleClick = () => {
        switchClass(
            document.getElementById('home'),
            'fade-out', 
            navigate, 
            '/categories'
        )
    }

    return (
        <>
        <Helmet title={'Home'} />
        <section id='home'>
            <Title />

            <div className='fill click-z absolute center-absolute flex flex-center col'>
                <button onClick={() => {handleClick()}} className='floatIn-up btn-long round-corners hover-button-rev'>
                    ENTER
                </button>
            </div>
            <div className='fill click-z absolute flex col' style={{top: '65%'}}>
                <div className='w-100 txt-center floatIn-up px-4'>
                    <h2>Welcome to <br></br> Oswald's Curio Outlet!</h2>
                </div>
            </div>
        </section>
        </>
    )
}

export default Home