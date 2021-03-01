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
    fetchCountries,
    fetchSubdivisions,
    generateToken,
} from "../../redux/selectFieldSlice"

const steps = ["Shipping address", "Payment details"];


const CheckoutForm: FC = (): JSX.Element => {
    const {cart} = useSelector((state: RootState) => state.rootReducer.cart)
    const token = useSelector((state: RootState) => state.rootReducer.fieldsData.token)
    const countries = useSelector((state: RootState) => state.rootReducer.fieldsData.countries)
    const country = useSelector((state: RootState) => state.rootReducer.fieldsData.country)
    const subdivision = useSelector((state: RootState) => state.rootReducer.fieldsData.subdivision)
    const subdivisions = useSelector((state: RootState) => state.rootReducer.fieldsData.subdivisions)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({})


    const countriesArray = Object.entries(countries).map(([code, name]) => ({id: code, label: name})) // Create array from object entries
    const subdivisionsArray = Object.entries(subdivisions).map(([code, name]) => ({id: code, label: name})) // Create array from object entries

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
        if (country) {
            dispatch(fetchSubdivisions(country))
        }
    }, [country])

    const Form = () => activeStep === 0 ?
        <AddressForm countries={countriesArray} country={country} subdivisions={subdivisionsArray}
                    subdivision={subdivision} next={next}/> : <PaymentForm token={token} backStep={backStep} formData={formData}/>


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
