import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Helmet from '../../../frontend/src/components/Helmet/Helmet'

import { login, register, reset } from '../../../frontend/src/features/auth/authSlice'
import { toast } from 'react-toastify'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        charCode: '',
        password: ''
    })

    const { name, charCode, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        // Redirect when logged in
        if(isSuccess){
            toast.success(message)
            
            const userData = {
                name,
                password
            }

            dispatch(login(userData))
        }

        if(user){
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
            name: name.toLowerCase(),
            charCode,
            password
        }

        dispatch(register(userData))
    }

    if(isLoading){
        return <p>Loading...</p>//<Spinner />
    }

    return (
        <>
            <Helmet title='Register' />
            <section id='register' className='slide-up' >
                <div className="bg-white container">
                    <div className='flex flex-center h-fill col'>
                        <h2>Register</h2>

                        <form onSubmit={handleSubmit} className='flex  w-80 flex-center col space-around'>
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
                                    type='charCode' 
                                    className='form-control' 
                                    id='charCode' 
                                    name='charCode'
                                    value={charCode} 
                                    onChange={handleChange} 
                                    placeholder='Enter your character code'
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
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register