import { Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import Helmet from '../components/Helmet/Helmet'
import ProductList from "../components/ProductList/ProductList"
// import BackButton from "../components/BackButton/BackButton"

import { getProducts } from "../features/data/dataSlice"

function Shop() {
    const [data, setData] = useState(null)
    
    const { user } = useSelector(state => state.auth)
    const { products, activeFilters } = useSelector(state => state.data)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) navigate('/login') 

        if(!activeFilters.category){
            navigate('/categories')
        } else {
            const request = {
                category: activeFilters.category,
                token: user.token
            }

            dispatch(getProducts(request))
        }

    }, [])

    useEffect(() => {
        setData(JSON.parse(products))
    }, [products])

    return (
        <>
            <Helmet title={'Shop - ' + activeFilters.category} />
            <section id="shop" className="slide-up">
                <Suspense fallback={"Getting products..."}>                    
                    {data ? 
                        <ProductList products={data} />
                        : null    
                    }
                </Suspense>
            </section>
        </>
    )
}

export default Shop