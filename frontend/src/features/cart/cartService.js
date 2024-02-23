import axios from 'axios'

const API_URL = '/api/users'

// Do Checkout
const doPurchase = async (data) => {
    // axios.defaults.baseURL = `http://localhost:5000`
    
    const {user, cart} = data

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    };

    // Create a Date object using the timestamp
    const currentDate = new Date(Date.now());

    // Get day, month, and year components
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const year = currentDate.getFullYear() % 100; // Get last two digits of the year
    const formattedDate = `${day}/${month}/${year}`;
    
    const purchaseLength = JSON.parse(user.purchases).length

    const purchases = cart.contents.map((el, i) => {
        const newID = purchaseLength + i
        
        return {
            id: newID,
            name: el.name,
            quantity: el.quantity,
            date: formattedDate
        }
    })

    const response = await axios.post(
        API_URL + '/buy', 
        {
            name: user.name,
            purchases: JSON.stringify(purchases),
            total: cart.total
        },
        config
    )

    return response.data.message
}

const cartService = {
    doPurchase
}

export default cartService