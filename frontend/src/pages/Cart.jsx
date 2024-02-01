import Helmet from "../components/Helmet/Helmet"
import CartContents from "../components/CartContents/CartContents"
import CommonContainer from "../components/CommonContainer/CommonContainer"

function Cart() {
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