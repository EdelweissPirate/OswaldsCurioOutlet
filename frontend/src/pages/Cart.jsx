import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Helmet from "../components/Helmet/Helmet"
import CartContents from "../components/CartContents/CartContents"
import CommonContainer from "../components/CommonContainer/CommonContainer"

function Cart() {
    const { user } = useSelector(state => state.auth)
    
    const navigate = useNavigate()

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])
    

    return (
        <>
            <Helmet title={'Cart'} />
            <section id="cart">
                <CommonContainer>
                    <CartContents />
                </CommonContainer>
            </section>
        </>
    )
}

export default Cart