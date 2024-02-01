import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import cartService from './cartService'

// localStorage.removeItem('cartData')
const cartData =  JSON.parse(localStorage.getItem('cartData'))

const initialState = {
    cartContents: cartData?.cartContents ? cartData.cartContents : [],
    cartPrice: cartData?.cartPrice ? cartData.cartPrice:  0,
    totalQuantity: cartData?.totalQuantity ? cartData.totalQuantity : 0,

    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// doPurchase
export const doPurchase = createAsyncThunk(
    'cart/doPurchase', 
    async (data, thunkAPI) => {
        try {
            return await cartService.doPurchase(data)
        } catch (error) {
            const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        addItem: (state, action) => {
            const newItem = action.payload
            
            const existingItem = state.cartContents.find(item => {
                return item.id === newItem.id
            })

            state.totalQuantity += Number(newItem.quantity)

            if(!existingItem){
                state.cartContents.push({
                    id: newItem.id,
                    name: newItem.name,
                    category: newItem.category,
                    price: newItem.price,
                    image: null, //newItem.image,
                    quantity: newItem.quantity,
                    totalPrice: newItem.price
                })
            } else {
                existingItem.quantity += Number(newItem.quantity)

                existingItem.totalPrice = Number(existingItem.totalPrice) + (Number(newItem.price) * Number(newItem.quantity))
            }

            state.cartPrice = state.cartContents.reduce((total, item) => total + 
                Number(item.price) * Number(item.quantity),
                0
            )

            const cartObj = {
                cartContents: [...state.cartContents],
                totalQuantity: state.totalQuantity,
                cartPrice: state.cartPrice
            }

            localStorage.setItem('cartData', JSON.stringify(cartObj))
        },

        removeItem: (state, action) => {
            const passedItem = action.payload

            const existingItem = state.cartContents.find(item => {
                return item.id === passedItem.id
            })

            if(!existingItem) return

            if(Number(passedItem.quantity) === 0) {
                state.cartContents = current(state.cartContents).filter(item => {
                    return item.id !== existingItem.id
                })

                state.totalQuantity = state.cartContents.length > 0 ? 
                    state.cartContents.reduce((total, item) =>
                        total + Number(item.quantity),
                        0
                    )
                    : 0

                state.cartPrice = state.cartContents.length > 0 ?
                    state.cartContents.reduce((total, item) => total + 
                        Number(item.price) * Number(item.quantity),
                        0
                    )
                    : 0
            } else {
                existingItem.quantity = passedItem.quantity

                existingItem.totalPrice = (Number(existingItem.price) * Number(existingItem.quantity))

                state.totalQuantity = state.cartContents.length > 0 ? 
                    current(state.cartContents).reduce((total, item) =>
                        total + Number(item.quantity),
                        0
                    )
                    : 0

                state.cartPrice = state.cartContents.length > 0 ?
                    current(state.cartContents).reduce((total, item) => total + 
                        Number(item.price) * Number(item.quantity),
                        0
                    )
                    : 0
            }

            

            localStorage.setItem('cartData', JSON.stringify({
                cartContents: state.cartContents.length > 0 ? [...state.cartContents] : [],
                totalQuantity: state.totalQuantity,
                cartPrice: state.cartPrice
            }))

            return
        },

        emptyCart: (state) => {
            state.cartContents = []
            state.totalQuantity = 0
            state.cartPrice = 0

            localStorage.setItem('cartData', JSON.stringify({
                cartContents: state.cartContents.length > 0 ? [...state.cartContents] : [],
                totalQuantity: state.totalQuantity,
                cartPrice: state.cartPrice
            }))

            return
        },

        // allows user to maintain current cart items and merge with items that already be in the cart from last session
        retrieveUserCart: (state, action) => {
            state.cartContents = [...action.payload, ...state.cartContents]

            state.totalQuantity = state.cartContents.reduce((total, item) => total + Number(item.quantity)
            )

            state.cartPrice = state.cartContents.reduce((total, item) => total + 
                Number(item.price) * Number(item.quantity)
            )

            localStorage.setItem('cartData', JSON.stringify({
                cartContents: [...state.cartContents],
                totalQuantity: state.totalQuantity,
                cartPrice: state.cartPrice
            }))
        }
    },
    extraReducers: (builder) => {
        builder
            //
            .addCase(doPurchase.pending, (state) => {
                state.isLoading = true
            })
            .addCase(doPurchase.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(doPurchase.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
});

export const { reset, addItem, removeItem, emptyCart, retrieveUserCart } = cartSlice.actions

export default cartSlice.reducer