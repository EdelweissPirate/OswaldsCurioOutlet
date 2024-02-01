import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import ItemIcon from "../components/ItemIcon/ItemIcon"

import Helmet from "../components/Helmet/Helmet"
import Wrapper from "../components/Wrapper/Wrapper"

import { 
    clearProducts, 
    clearActiveCategory, 
    getCategories, 
    setActiveCategory 
} from "../features/data/dataSlice"

import { switchClass } from "../utils"



function Categories() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { categories, isLoading, activeFilters} = useSelector(state => state.data)

    useEffect(() => {
        dispatch(clearProducts())
        dispatch(clearActiveCategory())
        
        if(!categories) dispatch(getCategories())

        return () => {

        }
    }, [])

    useEffect(() => {
        if(activeFilters.category){
            switchClass(
                document.getElementById('categories'), 
                'fade-out', 
                navigate, 
                `/shop/${activeFilters.category}`
            )
        }

        return () => {

        }
    }, [activeFilters])

    const onClick = (e, i) => {
        e.preventDefault()

        const formattedCat = categories[i].toLowerCase().split(' ').join('-')
        
        dispatch(setActiveCategory(formattedCat))
    }

    const onHover = () => {
        // dispatch(setFocusedCategory(i))
    }

    const generateCategories = () => {
        const _cats = categories.map((item, i) => {
            const cat = item.toLowerCase().split(' ').join('-')
            return <button
                onClick={e => {onClick(e, i)}}
                onMouseEnter={() => onHover(i)} 
                onMouseLeave={() => onHover(false)} 
                key={i} 
                className="hover-button-rev btn-long flex flex-center border round-corners"
            >
                <div className='product-center flex row flex-center space-between'>
                    <div className='product-icon flex flex-center text-center'>
                        <ItemIcon itemType={cat} />
                    </div>
                    <div className='product-name flex flex-center text-center'>
                        <h4>{item}</h4>
                    </div>
                </div>
            </button>
        })

        return [..._cats]
    }

    return (
        <>
        <Helmet title={'Categories'} />
        <section id="categories">
            <Suspense fallback={"Gathering stock..."}>
                <Wrapper>
                    <div className="categories-menu slide-fade flex flex-center col" >
                    {isLoading ? 
                        <div className="flex flex-center text-center">
                            <h4>Gathering stock...</h4> 
                        </div>
                    :
                        <>
                            <h2 className="spacer">Please select a category</h2>
                            <div className="round-corners border grid categories-menu-inner p-1 w-fill">
                                {categories ? generateCategories() : <h4>No stock found!</h4>}
                            </div>
                        </>
                    }
                    </div>
                </Wrapper>
            </Suspense>
        </section>
        </>
    )
}

export default Categories