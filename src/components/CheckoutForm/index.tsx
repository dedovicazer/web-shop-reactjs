import * as React from 'react';
import {FC, useEffect, useState} from "react"
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'
import useStyles from "./styles"
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Conformation from "./Conformation"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../redux/store"
import {
    fetchCountries, fetchShippingOptions,
    fetchSubdivisions,
    generateToken,
} from "../../redux/selectFieldSlice"

const steps = ["Shipping address", "Payment details"];


const CheckoutForm: FC = (): JSX.Element => {
    const { cart } = useSelector((state: RootState) => state.rootReducer.cart)
    const token = useSelector((state: RootState) => state.rootReducer.fieldsData.token)
    const countries = useSelector((state: RootState) => state.rootReducer.fieldsData.countries)
    const country = useSelector((state: RootState) => state.rootReducer.fieldsData.country)
    const subdivision = useSelector((state: RootState) => state.rootReducer.fieldsData.subdivision)
    const subdivisions = useSelector((state: RootState) => state.rootReducer.fieldsData.subdivisions)
    const options = useSelector((state: RootState) => state.rootReducer.fieldsData.options)
    const option = useSelector((state: RootState) => state.rootReducer.fieldsData.option)
    const { order } = useSelector((state: RootState) => state.rootReducer.order)
    const { errorMessage } = useSelector((state: RootState) => state.rootReducer.order)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({})


    const countriesArray = Object.entries(countries).map(([code, name]) => ({id: code, label: name})) // Create array from object entries
    const subdivisionsArray = Object.entries(subdivisions).map(([code, name]) => ({id: code, label: name})) // Create array from object entries
    const optionsArray = options.map(( option: any ) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})` }))

    const [activeStep, setActiveStep] = useState(0)
    const classes = useStyles()

    useEffect(() => {
        dispatch(generateToken(cart.id!))
        dispatch(fetchCountries(token.id!))
    }, [cart])

    const next = (data: {}) => {
            setFormData(data)
        nextStep()
    }

    const nextStep = () => setActiveStep((prevActiveStep)=> prevActiveStep + 1 )
    const backStep = () => setActiveStep((prevActiveStep)=> prevActiveStep - 1 )

    useEffect(() => {
        if(token) {
            dispatch(fetchCountries(token.id!))
        }
    }, [token])

    useEffect(() => {
        if (country) {
            dispatch(fetchSubdivisions(country))
        }
    }, [country])

    useEffect(() => {
        if (subdivision) {
            dispatch(fetchShippingOptions(token.id!, country, subdivision))
        }
    }, [subdivision])

    const Form = () => activeStep === 0 ?
        <AddressForm countries={countriesArray} country={country} subdivisions={subdivisionsArray} option={option} options={optionsArray}
                    subdivision={subdivision} next={next}/> : <PaymentForm token={token} backStep={backStep} formData={formData} nextStep={nextStep}/>



    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography align="center" variant="h4">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map(step => <Step key={step}><StepLabel>{step}</StepLabel></Step>)
                        }
                    </Stepper>
                    {activeStep === steps.length ? <Conformation/> : <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default CheckoutForm
