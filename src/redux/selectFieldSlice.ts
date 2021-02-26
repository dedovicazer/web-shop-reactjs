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
    tokenId: ""
}

export const selectFieldSlice = createSlice({
    name: 'fieldsData',
    initialState,
    reducers: {
        setToken: (state: InitialStateType, action: PayloadAction<string>) => ({...state, tokenId: action.payload}),
        setCountries: (state: InitialStateType, action: PayloadAction<any>) => ({...state, countries: action.payload}),
        setCountry: (state: InitialStateType, action: PayloadAction<any>) => ({...state, country: action.payload}),
        setSubdivision: (state: InitialStateType, action: PayloadAction<any>) => ({...state, subdivision: action.payload}),
        setSubdivisions: (state: InitialStateType, action: PayloadAction<any>) => ({...state, subdivisions: action.payload})
    }
})

export const {setToken, setCountries, setSubdivisions, setCountry, setSubdivision} = selectFieldSlice.actions


export const fetchCountries = (tokenId: string) => async (dispatch: Dispatch<ActionType>) => {
    const { countries } = await commerce.services.localeListCountries(tokenId)
    dispatch(setCountries(countries))
    dispatch(setCountry(Object.keys(countries)[0]))
}

export const fetchSubdivisions = (countryCode: string) => async (dispatch: Dispatch<ActionType>) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
    dispatch(setSubdivisions(subdivisions))
    dispatch(setSubdivision(Object.keys(subdivisions)[0]))
}

export const generateToken = (cartId: string) => async (dispatch: Dispatch<ActionType>) => {
    try {
        const token = await commerce.checkout.generateToken(cartId, {type: 'cart'})
        dispatch(setToken(token.id))
    } catch (error) {

    }
}

export default selectFieldSlice.reducer

// Types

type ActionType = ReturnType<typeof setToken>


type InitialStateType = {
    countries: {}
    country: string
    subdivision: string
    options: []
    subdivisions: []
    tokenId: string
}

type CountriesType = {}