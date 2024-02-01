import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Helmet from "../components/Helmet/Helmet"
import Wrapper from '../components/Wrapper/Wrapper'
import CommonContainer from '../components/CommonContainer/CommonContainer'

function Purchases() {
    const [purchaseList, setPurchaseList] = useState([])

    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }

        const purchasesParsed = JSON.parse(user.purchases).reverse()

        // console.log(user.purchases);

        const pL = purchasesParsed.map((el, i) => {
            return (
            <div className='flex row list-bg p-1' key={el.name + i} >
                <div className='purchase-id txt-center my-1 col'>
                    <div className='flex row space-between w-fill my-1'>
                        <h4>{el.id}</h4>
                    </div>
                </div>
                <div className='purchase-details txt-center my-1 col' >
                    <div className='flex row space-between w-fill my-1'>
                        <h4>{el.name}</h4>
                        <p>{el.quantity}</p>
                        <p>{el.date}</p>
                    </div>
                </div>
            </div>
            )
        })

        setPurchaseList(pL)
    }, [user, navigate])

    return (
        <>
            <Helmet title={'Purchases'} />
            <section>
                <CommonContainer>
                    <h2 className='my-1 txt-center'>Purchases</h2>
                    <div style={{maxHeight:"90vh"}}>
                        <div className='flex flex-center row w-fill bg-dark' >
                            <div className="flex row space-between py-1 w-80">
                                <h4>ID</h4>                                        
                                <h4>Name</h4>
                                <h4>Count</h4>
                                <h4>Date</h4>
                            </div>
                        </div>
                        <Wrapper>
                            <div className='w-fill flex flex-center h-fill col m-auto'>
                                <div className="purchases-grid grid">
                                    <div className='purchases-details' style={{minHeight:"400px"}}>
                                        {purchaseList ? purchaseList : null}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </CommonContainer>
            </section>
        </>
    )
}

export default Purchases