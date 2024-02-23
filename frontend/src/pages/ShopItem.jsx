import { Suspense, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Helmet from "../components/Helmet/Helmet"
import ProductDescription from "../components/ProductDescription/ProductDescription"

function ShopItem() {
    const [data, setData] = useState(null)  

    const { id } = useParams()
    const { products } = useSelector(state => state.data)  

    useEffect(() => {
        async function initData () {
            try {
                const prods = await JSON.parse(products)
                const filteredProduct = prods.filter(item => item.index === id).pop()
                const response = await fetch(`https://www.dnd5eapi.co${filteredProduct.url}`);
                const data = await response.json();
                setData(data)
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        }

        initData()
    }, [])

    return (
        <>
            <Helmet title='shop' />
            <section id="ShopItem">
                <Suspense fallback={"Getting item info..."}>
                    {
                        data ? <ProductDescription data={data} /> 
                        :
                        <div className="h-fill flex flex-center txt-center">
                            <h2>Getting item info...</h2>
                        </div>
                    }
                </Suspense>
            </section>
        </>
    )
}

export default ShopItem