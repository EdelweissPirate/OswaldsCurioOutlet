import axios from 'axios'

const API_URL = '/api'

//Get Categories
const getCategories = async () => {
    axios.defaults.baseURL = `https://www.dnd5eapi.co`

    const response = await axios.get(API_URL + '/equipment-categories')

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
        output = response.data.results.map((cat) =>{
            return cat.name.replace(/'/g, '')
        })

        bannedWords.map((el) => {
            output = output.filter(ii => !ii.toLowerCase().includes(el))
        })

        
    }

    return output
}

//Get Products
const getProducts = async (category) => {
    axios.defaults.baseURL = `https://www.dnd5eapi.co`
    
    const response = await axios.get(API_URL + '/equipment-categories/' + category)

    let output = []

    if(response.data){
        output = JSON.stringify(response.data.equipment)
    }

    return output
}

const dataService = {
    getCategories,
    getProducts
}

export default dataService