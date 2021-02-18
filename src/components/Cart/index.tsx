import * as React from 'react';
import {FC} from "react";
import  {Container, Typography, Button, Grid} from "@material-ui/core";
import { EmptyCart, FilledCart } from "../../components"
import useStyles from "./styles"
import {CartType} from "../Products/types";

type Props = {
    cart: CartType

};

const Cart: FC<Props> = ({cart}): JSX.Element => {
    const classes = useStyles()

    if(!cart.line_items) return <>"Loading..."</>

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3">Your shopping cart </Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart cart={cart}/>}
        </Container>
    )
}

export default Cart
