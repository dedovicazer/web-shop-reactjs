import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import {productsSlice} from "./productsSlice";
import {cartSlice} from "./cartSlice";
import {selectFieldSlice} from "./selectFieldSlice";

const rootReducer = combineReducers({
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    fieldsData: selectFieldSlice.reducer
})

export const store = configureStore({
    reducer: {
        rootReducer
    },
    middleware: [...getDefaultMiddleware({})]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch