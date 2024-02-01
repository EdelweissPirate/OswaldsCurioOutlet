import axios from 'axios'

const API_URL = '/api/users'

//Register user
const register = async (userData) => {
    axios.defaults.baseURL = `http://localhost:5000`

    const response = await axios.post(API_URL + '/register', userData)
    
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login = async (userData) => {
    axios.defaults.baseURL = `http://localhost:5000`

    try {
        const response = await axios.post(API_URL + '/login', userData)
        // console.log(response.data)
        if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
    } catch (error) {
        throw Error('No account found')
    }
}

//Login user
const getUser = async (userData) => {
    axios.defaults.baseURL = `http://localhost:5000`    
    const token = userData.token

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await axios.get(API_URL + '/me', config)
            .then(res => res.data)

        const newUser = {
            name: response.name,
            gold: response.gold,
            purchases: response.purchases,
            token: userData.token
        }

        localStorage.setItem('user', JSON.stringify(newUser))
        
        return newUser
    } catch (error) {
        throw Error('No account found')
    }
}

//Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
    getUser
}

export default authService