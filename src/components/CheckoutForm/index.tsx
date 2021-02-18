import * as React from 'react';
import {FC, useState} from "react";
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'
import useStyles from "./styles"
import {Payment} from "@material-ui/icons";
import AdressForm from "./AdressForm";
import PaymentForm from "./PaymentForm";
import Conformation from "./Conformation";

type Props = {

};

const steps = [ "Shipping address", "Payment details" ];

const  CheckoutForm: FC<Props> = (): JSX.Element => {

    const Form = () => activeStep === 0 ? <AdressForm /> : <PaymentForm/>

    const [ activeStep, setActiveStep ] = useState(1)
    const classes = useStyles()

    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper} >
                    <Typography align="center" variant="h4">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map(step => <Step key={step}><StepLabel>{step}</StepLabel></Step>)
                        }
                    </Stepper>
                    {activeStep === steps.length ? <Conformation /> : <Form />}
                </Paper>
            </main>
        </>
    )
}

export default  CheckoutForm
