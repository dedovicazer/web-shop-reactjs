import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {commerce} from "../lib/commerce";
import {Dispatch} from "react";
import {CartType} from "./cartSlice";


const initialState: InitialStateType = {
    order: {},
    errorMessage: ""
}

export const checkoutSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state: InitialStateType, action: PayloadAction<OrderType>) => ({...state, order: action.payload}),
        setErrorMessage: (state: InitialStateType, action: PayloadAction<string>) => ({
            ...state,
            errorMessage: action.payload
        }),
        setCart: (state: InitialStateType, action: PayloadAction<CartType>) => ({...state, cart: action.payload})
    }
})

const {setOrder, setErrorMessage, setCart} = checkoutSlice.actions

export const handleCaptureCheckout = (tokenId: string, newOrder: OrderType) => async (dispatch: Dispatch<ActionType>) => {
    try {
        const incomingOrder = await commerce.checkout.capture(tokenId, newOrder)
        dispatch(setOrder(incomingOrder))
        dispatch(refreshCart())
    } catch (error) {
        console.log(error)

    }

}

const refreshCart = () => async (dispatch: Dispatch<any>) => {
    const newCart = await commerce.cart.refresh();
    dispatch(setCart(newCart))

}


// Types

type ActionType = ReturnType<typeof setOrder>
    | ReturnType<typeof setCart>
    | ReturnType<typeof refreshCart>


type InitialStateType = {
    order: {}
    errorMessage: string
}

export type OrderType = {
    line_items: []
    customer: {
        firstname: string
        lastname: string
        email: string
    },
    shipping: {
        name: string
        street: string
        town_city: string,
        county_state: string,
        postal_zip_code: string,
        country: string,
    },
    fulfillment: {
        shipping_method: string,
    },
    payment: {
        gateway: string
        stripe: {
            payment_method_id: string
        },
    },

}