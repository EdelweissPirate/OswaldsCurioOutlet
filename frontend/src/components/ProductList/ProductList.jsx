import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import ProductCard from '../ProductCard/ProductCard'
import Wrapper from '../Wrapper/Wrapper'

import PropTypes from "prop-types";

import './productList.css'

function ProductList({ products }) {
    const [productData, setProductData] = useState(null)

    const { category } = useParams()

    useEffect(() => {
        const prods = products.sort((a, b) => {
            // Convert both names to lowercase for case-insensitive comparison
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
        
            // Compare the two names
            if (nameA < nameB) {
                return -1; // Name "a" comes before name "b"
            }
            if (nameA > nameB) {
                return 1; // Name "a" comes after name "b"
            }
            return 0; // Names are equal
        });
        
        setProductData(
            prods.map((item, i) => {
                return <ProductCard {...item} key={item + i} />
            })
        )
    }, [])

    return (
        <div id='product-list' className='container'>
            <div className="flex flex-center text-center" style={{padding:"2rem 0rem"}}>
                <h2>{category.toUpperCase()}</h2>
            </div>
            <Wrapper>
                <div className='product-grid'>
                    {productData?.length > 0 ? 
                        productData
                        : <h2>Coming Soon!</h2>
                    }
                </div>
            </Wrapper>
        </div>
    )
}

ProductList.propTypes = {
    products: PropTypes.array,
}

export default ProductList