import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import dataReducer from '../features/data/dataSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        data: dataReducer,
    },
});