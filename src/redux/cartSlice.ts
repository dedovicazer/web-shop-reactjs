import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {commerce} from "../lib/commerce";
import {Dispatch} from "react";
import {ProductType} from "./productsSlice";



const initialState: InitialStateType = {
    cart: {
        id: null,
        subtotal: null,
        total_items: null,
        line_items: null,
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart:
            (state: InitialStateType, action: PayloadAction<CartType>) => ({cart: action.payload})
    }
})

const { setCart } = cartSlice.actions

export const fetchCart = () => async (dispatch: Dispatch<ActionType>) => {
    const cart  = await commerce.cart.retrieve()
    dispatch(setCart(cart))
}

export const addToCart = (productId: string, quantity: number) => async (dispatch: Dispatch<ActionType>) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    dispatch(setCart(cart))

}

export const UpdateCartQuantity = (productId: string, quantity: number) => async (dispatch: Dispatch<ActionType>) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    dispatch(setCart(cart))

}

export const removeCart = (productId: string) => async (dispatch: Dispatch<ActionType>) => {
    const { cart } = await  commerce.cart.remove(productId)
    dispatch(setCart(cart))

}

export const EmptyCart = () => async (dispatch: Dispatch<ActionType>) => {
    const { cart } = await  commerce.cart.empty()
    dispatch(setCart(cart))

}

export default cartSlice.reducer

// Types

type ActionType = ReturnType<typeof setCart>

export type CartType = {
    id: string | null
    subtotal: { formatted_with_symbol: string } | null;
    total_items: number | null
    line_items: ProductType[] | null
}

type InitialStateType = {
    cart: CartType
}