import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {commerce} from "../lib/commerce";
import {Dispatch} from "react";
import {PriceType} from "./selectFieldSlice";




const initialState: InitialStateType = {
    products: []
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state: InitialStateType, action:PayloadAction<ProductType[]>) => ({ products: action.payload })
    }
})

const { setProducts } = productsSlice.actions

export const fetchProducts = () => async (dispatch: Dispatch<ActionType>) =>{
    const { data } = await commerce.products.list();
    dispatch(setProducts(data))
}

export default productsSlice.reducer

// Types

type ActionType = ReturnType<typeof setProducts>

export type ProductType = {
    id: string
    name: string
    description: string
    media: {source: string}
    price: PriceType
    line_total: {formatted_width_symbol: string}
    quantity: number
}

type InitialStateType = {
    products: ProductType[]
}