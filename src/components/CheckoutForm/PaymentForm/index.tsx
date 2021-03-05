import * as React from 'react'
import {FC} from "react"
import {Typography, Button, Divider} from "@material-ui/core"
import {Elements, CardElement, ElementsConsumer} from "@stripe/react-stripe-js"
import {loadStripe} from '@stripe/stripe-js'
import Review from "../Review"
import {handleCaptureCheckout} from "../../../redux/checkoutSlice"
import {useDispatch} from "react-redux";


type Props = {
    token: any
    backStep: any
    formData: any
    nextStep: any
}

const PaymentForm: FC<Props> = ({token, backStep, formData, nextStep}): JSX.Element => {
    const dispatch = useDispatch()

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
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email
                },
                shipping: {
                    name: formData.firstname,
                    street: formData.address,
                    town_city: formData.city,
                    county_state: formData.subdivision,
                    postal_zip_code: formData.zip,
                    country: formData.country,
                },
                fulfillment: {
                    shipping_method: formData.option,
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    },
                },
            }

        dispatch(handleCaptureCheckout(token.id, orderData))
        nextStep()
    }
}

// @ts-ignore
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
return (
    <>
        <Review token={token}/>
        <Divider/>
        <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
        <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {({elements, stripe}) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement/>
                        <br/> <br/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant="outlined" onClick={() => {
                                backStep()
                            }}>Back</Button>
                            <Button type="submit" color="primary" disabled={!stripe}
                                    variant="contained">Pay</Button>
                        </div>
                    </form>
                )}
            </ElementsConsumer>
        </Elements>
    </>
)
}

export default PaymentForm
