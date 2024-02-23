
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dataService from './dataService'

const initialState = {
    categories: null,
    products: null,
    
    currency: 'gp',

    activeFilters: {
        category: null,
        price: null,
        type: 'any',
        results: 24
    },
    
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// getCategories
export const getCategories = createAsyncThunk(
    'data/getCategories', 
    async (user, thunkAPI) => {
        try {
            return await dataService.getCategories(user)
        } catch (error) {
            const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// getProducts
export const getProducts = createAsyncThunk(
    'data/getProducts', 
    async (data, thunkAPI) => {
        try {
            return await dataService.getProducts(data)
        } catch (error) {
            const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
        
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setActiveCategory: (state, action) => {
            state.activeFilters.category = action.payload//state.categories[action.payload].toLowerCase().split(' ').join('-')
        },

        clearActiveCategory: (state) => {
            state.activeFilters.category = null
        },

        clearProducts: (state) => {
            state.products = null
        },

        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            //
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.categories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.categories = null
            })
            //
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.products = null
            })

    }
})

export const { setActiveCategory, clearActiveCategory, clearProducts, reset } = dataSlice.actions
export default dataSlice.reducer