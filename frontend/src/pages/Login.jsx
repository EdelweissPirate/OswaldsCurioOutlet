import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import Helmet from '../../../frontend/src/components/Helmet/Helmet'

import { login, reset } from '../../../frontend/src/features/auth/authSlice'

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    })

    const { name, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { 
        user, 
        isLoading, 
        isSuccess, 
        isError, 
        message 
    } = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(user){
            toast.success(message)
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            name,
            password
        }

        dispatch(login(userData))
    }

    return (
        <>
            <Helmet title='Login' />
            <section id='login' className='slide-up' >
                <div className="bg-white container">
                    <div className='flex flex-center h-fill col'>
                        {isLoading ?  
                            <h1>Loading...</h1> :
                            <>
                                <h2>LOGIN</h2>

                                <form onSubmit={handleSubmit} className='flex w-80 flex-center col space-around'>
                                    <div>
                                        <input 
                                            type='name' 
                                            className='form-control' 
                                            id='name' 
                                            name='name'
                                            value={name} 
                                            onChange={handleChange} 
                                            placeholder='Enter your name'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            type='password' 
                                            className='form-control' 
                                            id='password' 
                                            name='password'
                                            value={password} 
                                            onChange={handleChange} 
                                            placeholder='Enter your password'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <button className='btn-long hover-button round-corners border'>
                                            SUBMIT
                                        </button>
                                    </div>
                                </form>
                                <aside className='flex'>
                                    <a href='/register'>Not registered? click here</a>
                                </aside>
                            </>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login