import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {commerce} from "../lib/commerce";
import {Dispatch} from "react";
import {ProductType} from "./productsSlice";


const initialState: InitialStateType = {
    countries: {},
    country: "",
    subdivision: "",
    subdivisions: [],
    options: [],
    option: "",
    token: {
        id: null
    }
}

export const selectFieldSlice = createSlice({
    name: 'fieldsData',
    initialState,
    reducers: {
        setToken: (state: InitialStateType, action: PayloadAction<{id: string}>) => ({...state, token: action.payload}),
        setCountries: (state: InitialStateType, action: PayloadAction<any>) => ({...state, countries: action.payload}),
        setCountry: (state: InitialStateType, action: PayloadAction<any>) => ({...state, country: action.payload}),
        setSubdivision: (state: InitialStateType, action: PayloadAction<any>) => ({...state, subdivision: action.payload}),
        setSubdivisions: (state: InitialStateType, action: PayloadAction<any>) => ({...state, subdivisions: action.payload}),
        setOptions: (state: InitialStateType, action: PayloadAction<any>) => ({...state, options: action.payload}),
        setOption: (state: InitialStateType, action: PayloadAction<any>) => ({...state, option: action.payload})
    }
})

export const {setToken, setCountries, setSubdivisions, setCountry, setSubdivision, setOptions, setOption} = selectFieldSlice.actions


export const fetchCountries = (tokenId: string) => async (dispatch: Dispatch<ActionType>) => {
    const { countries } = await commerce.services.localeListShippingCountries(tokenId)
    dispatch(setCountries(countries))
    dispatch(setCountry(Object.keys(countries)[0]))
}

export const fetchSubdivisions = (countryCode: string) => async (dispatch: Dispatch<ActionType>) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
    dispatch(setSubdivisions(subdivisions))
    dispatch(setSubdivision(Object.keys(subdivisions)[0]))
}

export const fetchShippingOptions = (tokenId: string, country: string, region: string) => async (dispatch: Dispatch<ActionType>) => {
    const shippingOptions = await commerce.checkout.getShippingOptions(tokenId, { country: country, region: region })
    dispatch(setOptions(shippingOptions))
    dispatch(setOption(shippingOptions[0].id))
}

export const generateToken = (cartId: string) => async (dispatch: Dispatch<ActionType>) => {
    try {
        const token = await commerce.checkout.generateToken(cartId, {type: 'cart'})
        dispatch(setToken(token))
    } catch (error) {

    }
}

export default selectFieldSlice.reducer

// Types

type ActionType = ReturnType<typeof setToken>
                  | ReturnType<typeof setCountries>
                  | ReturnType<typeof setCountry>
                  | ReturnType<typeof setSubdivisions>
                  | ReturnType<typeof setSubdivision>
                  | ReturnType<typeof setOptions>
                  | ReturnType<typeof setOption>

type InitialStateType = {
    countries: {}
    country: string
    subdivision: string
    subdivisions: []
    option: ""
    options: []
    token: {
        id: string | null
    }
}
