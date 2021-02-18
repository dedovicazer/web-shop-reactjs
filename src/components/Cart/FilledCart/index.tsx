import * as React from 'react';
import {FC} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {CartType} from "../../Products/types";
import useStyles from "../styles"
import CartItem from "../CartItem";

type Props = {
    cart: CartType
};

const  FilledCart: FC<Props> = ({cart}): JSX.Element => {
    const classes = useStyles()
    return (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map(item => (
                    <Grid item xs ={12} sm={4} key={item.id}>
                        <CartItem item={item}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )
}

export default  FilledCart
