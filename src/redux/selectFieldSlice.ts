import {createSlice, PayloadAction, } from '@reduxjs/toolkit'
import {commerce} from "../lib/commerce"
import {Dispatch} from "react"


const initialState: InitialStateType = {
    countries: null,
    country: null,
    subdivision: null,
    subdivisions: null,
    options: null,
    option: null,
    token: null
}

export const selectFieldSlice = createSlice({
    name: 'fieldsData',
    initialState,
    reducers: {
        setToken: (state: InitialStateType, action: PayloadAction<TokenType>) => ({...state, token: action.payload}),
        setCountries: (state: InitialStateType, action: PayloadAction<SelectFieldDataType<string, string>>) => ({...state, countries: action.payload}),
        setCountry: (state: InitialStateType, action: PayloadAction<string>) => ({...state, country: action.payload}),
        setSubdivision: (state: InitialStateType, action: PayloadAction<string>) => ({...state, subdivision: action.payload}),
        setSubdivisions: (state: InitialStateType, action: PayloadAction<SelectFieldDataType<string, string>>) => ({...state, subdivisions: action.payload}),
        setOptions: (state: InitialStateType, action: PayloadAction<OptionType[]>) => ({...state, options: action.payload}),
        setOption: (state: InitialStateType, action: PayloadAction<string>) => ({...state, option: action.payload})
    }
})

export const {setToken, setCountries, setSubdivisions, setCountry, setSubdivision, setOptions, setOption} = selectFieldSlice.actions



export const fetchCountries = (tokenId: string) => async(dispatch: Dispatch<ActionType>) => {
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
    countries: SelectFieldDataType<string, string> | null
    country: string | null
    subdivision: string | null
    subdivisions: SelectFieldDataType<string, string> | null
    options: OptionType[] | null
    option: string | null
    token: TokenType | null
}

export type selectFieldResponseType = {
    countries: SelectFieldDataType<string, string>
    html: HTMLElement
}


export type SelectFieldDataType<key, value> = {
    key: value
}

export type OptionType = {
    id: string
    description: string
    price: PriceType
    countries: [string]
}

export type PriceType = {
    raw: string
    formatted: string
    formatted_with_symbol: string
    formatted_with_code: string

}

export type TokenType = {
    id: string
}
