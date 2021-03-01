import * as React from 'react'
import {FC} from "react"
import  {Typography, Button, Divider } from "@material-ui/core"
import {Elements, CardElement, ElementsConsumer} from "@stripe/react-stripe-js"
import {loadStripe} from '@stripe/stripe-js'
import Review from "../Review"
import {CameraAlt} from "@material-ui/icons"



type Props = {
    token: any
    backStep: any
    formData: any
}

const  PaymentForm: FC<Props> = ({ token, backStep, formData }): JSX.Element => {
    const handleSubmit = async (event: React.SyntheticEvent, elements: any, stripe: any) => {

        event.preventDefault()
        if (!stripe || !elements) return

        const cardElement = elements.getElement(CardElement)
        const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement})

        if (error) {
            console.log(error)
        } else {
            const orderData = {
                line_items: token.live.line_items,
                customer: {
                    fistname: formData.fistname,
                    lastname: formData.lastname,
                    email: formData.email,
                    shipping: {
                        name: 'Primary',
                        street: formData.address
                    }
                }
            }
        }


    }
    // @ts-ignore
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    return (
        <>
            <Review  token={token}/>
            <Divider />
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe})=> (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br/> <br/>
                            <div style={ {display: 'flex', justifyContent: 'space-between'} }>
                                <Button variant="outlined" onClick={()=> {backStep()}}>Back</Button>
                                <Button type="submit"  color="primary" disabled={!stripe} variant="contained">Pay</Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default  PaymentForm
