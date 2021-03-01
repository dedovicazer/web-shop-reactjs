import * as React from 'react'
import {FC} from "react"
import  {Typography, Button, Divider } from "@material-ui/core"
import {Elements, CardElement, ElementsConsumer} from "@stripe/react-stripe-js"
import {loadStripe} from '@stripe/stripe-js'
import Review from "../Review";



type Props = {
    token: any
}

const  PaymentForm: FC<Props> = ({token}): JSX.Element => {
    return (
        <>
            <Review  token={token}/>
        </>
    )
}

export default  PaymentForm
