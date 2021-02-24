import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {commerce} from "../lib/commerce";
import {Dispatch} from "react";
import {ProductType} from "./productsSlice";


const initialState: InitialStateType = {
    countries: {},
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
        setSubdivisions: (state: InitialStateType, action: PayloadAction<any>) => ({...state, subdivisions: action.payload}),
    }
})

const {setToken, setCountries, setSubdivisions} = selectFieldSlice.actions


export const fetchCountries = (tokenId: string) => async (dispatch: Dispatch<ActionType>) => {
    const { countries } = await commerce.services.localeListCountries(tokenId)
    dispatch(setCountries(countries))
}

export const fetchSubdivision = (countryCode: string) => async (dispatch: Dispatch<ActionType>) => {
    const { subdivisions } = await commerce.services.localeListSubdivision(countryCode)
    dispatch(setCountries(subdivisions))
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
    options: []
    subdivisions: []
    tokenId: string
}

type CountriesType = {}