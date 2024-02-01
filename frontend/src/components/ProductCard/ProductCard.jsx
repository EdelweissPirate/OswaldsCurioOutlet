import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ItemIcon from '../ItemIcon/ItemIcon'

import { switchClass } from '../../utils'

import PropTypes from "prop-types";

import './productCard.css'

function ProductCard(props) {
    const [product, setProduct] = useState(null)
    
    const { activeFilters } = useSelector(state => state.data)

    const navigate = useNavigate()

    useEffect(() => {
        if(!product){
            const fetchProductData = async () => {
                try {
                    const response = await fetch(`https://www.dnd5eapi.co${props.url}`);
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product data:', error);
                }
            };
    
            fetchProductData();
        }
    }, [product, props.url])

    const handleSelect = (e) => {
        e.preventDefault()
        switchClass(document.querySelector('#shop'), 'slide-out', navigate, `/shop/${activeFilters.category}/${props.index}`)
    }

    return (
        <div className='product-grid-item'>
            
            {product ? 
                <>
                    <button onClick={handleSelect} className='product-link col hover-button-rev btn-long flex flex-center border round-corners'>
                        
                        <div className='product-center flex row flex-center space-between'>
                            <div className='product-icon flex flex-center text-center'>
                                <ItemIcon itemType={activeFilters.category} />
                            </div>
                            <div className='product-name flex flex-center text-center'>
                                <h4>{product.name}</h4>
                            </div>
                        </div>
                    </button>

                </>
                :
                null
            }

        </div>
    )
}

ProductCard.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    index: PropTypes.string
}

export default ProductCard