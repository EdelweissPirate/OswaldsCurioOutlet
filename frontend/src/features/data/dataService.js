import axios from 'axios'

const API_URL = '/api'

//Get Categories
const getCategories = async (userData) => {
    axios.defaults.baseURL = "https://oco-stockroom.vercel.app/api"//import.meta.env.REACT_APP_BASE_URL

    const token = userData.token

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        // axios.defaults.baseURL = `http://localhost:5000`

        const response = await axios.get(API_URL + '/data/getCategories', config)

        let output = []

        const bannedWords = [
            "vehicles", 
            "light", 
            "medium",
            "heavy", 
            "artisans", 
            "other", 
            "martial", 
            "melee", 
            "ranged", 
            "simple", 
            "standard",
            "scroll"
        ]

        if(response.data){
            output = JSON.parse(response.data.categories)

            bannedWords.map((el) => {
                output = output.filter(ii => !ii.toLowerCase().includes(el))
            })
        }

        return output
    } catch (error) {
        throw new Error('Failed to retrieve categories')
    }
}

//Get Products
const getProducts = async (data) => {
    axios.defaults.baseURL = "https://oco-stockroom.vercel.app/api"//import.meta.env.REACT_APP_BASE_URL
    
    const { category, token } = data

    try {
        // axios.defaults.baseURL = `http://localhost:5000`
        const url = `${API_URL}/data/getProducts?name=${encodeURIComponent(category)}`;
        
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.get(url, config)
            .then((result) => {
                return result.data
            }).catch((err) => {
                throw new Error('Failed to get products.', err)
            });

        return response.products
    } catch (error) {
        throw new Error('Failed to retrieve products.', error)
    }
}

const dataService = {
    getCategories,
    getProducts
}

export default dataService