import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Helmet from "../components/Helmet/Helmet"
import Wrapper from '../components/Wrapper/Wrapper'
import CommonContainer from '../components/CommonContainer/CommonContainer'

import { getUser, logout, reset } from "../features/auth/authSlice"
import { toast } from 'react-toastify'

function Account() {
    const [data, setData] = useState({
        name: '',
        gold: {
            gp: 0,
            sp: 0,
            cp: 0
        }
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, message } = useSelector(state => state.auth)

    useEffect(() => {
        if(message) toast.info(message)

        async function setName(string) {
            const stringArr = string.split('');
            const updatedName = stringArr[0].toUpperCase() + stringArr.slice(1).join('');
            setData(prevData => ({ ...prevData, name: updatedName }));
        }

        async function setCurrency(gold) {
            const updatedGold = {
                gp: Math.floor(gold),
                sp: Math.floor((gold - Math.floor(gold)) * 100 / 10),
                cp: Math.round(((gold - Math.floor(gold)) * 100) % 10)
            }
            setData(prevData => ({ ...prevData, gold: updatedGold }));
        }

        if(!user){
            navigate('/')
        } else {
            dispatch(getUser(user))    
            setName(user.name)
            setCurrency(user.gold)    
        }

        dispatch(reset())
    }, [])
    

    const handleLogout = () => {
        dispatch(logout())
        toast.info(message)
        navigate('/')
    }

    return (
        <>
            <Helmet title={'Account'} />
            <section>
                <CommonContainer>
                    <Wrapper>
                        <div className='w-90 flex flex-center h-fill col m-auto'>
                            <h2 className='py-1'>ACCOUNT</h2>

                            <div className="account-grid grid">
                                <div className='account-details txt-center my-1 p-4' style={{minHeight: '400px'}}>
                                    <div className='flex row space-between w-fill my-1'>
                                        <h4>Name</h4>
                                        <p>{data.name}</p>
                                    </div>

                                    <div className='flex row space-between w-fill my-1'>
                                        <h4>Gold</h4>
                                        <p>{data.gold.gp} GP</p>
                                    </div>

                                    <div className='flex row space-between w-fill my-1'>
                                        <h4>Silver</h4>
                                        <p>{data.gold.sp} SP</p>
                                    </div>

                                    <div className='flex row space-between w-fill my-1'>
                                        <h4>Copper</h4>
                                        <p>{data.gold.cp} CP</p>
                                    </div>
                                </div>

                                <aside className='account-settings flex col p-4'>
                                <button 
                                        className="m-1 btn-long border round-corners hover-button-rev" 
                                        onClick={() => navigate('/purchases')}
                                    >
                                        Purchase History
                                    </button>

                                    <button 
                                        className="m-1 btn-long border round-corners hover-button-rev" 
                                        onClick={() => navigate('/cart')}
                                    >
                                        Go to cart
                                    </button>
                                </aside>
                            </div>

                            <button 
                                className="m-1 btn-long border round-corners hover-button-rev" 
                                onClick={handleLogout}
                            >
                                LOGOUT
                            </button>
                        </div>
                    </Wrapper>
                </CommonContainer>
            </section>
        </>
    )
}

export default Account