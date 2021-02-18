import * as React from 'react';
import {FC} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {CartType} from "../../Products/types";
import useStyles from "../styles"
import CartItem from "../CartItem";
import {Link} from "react-router-dom";

type Props = {
    cart: CartType
    UpdateCartQuantity: (productId: string, quantity: number) => void
    RemoveCart: (productId: string) => void
    onEmptyCart: () => void
};

const  FilledCart: FC<Props> = ({cart,UpdateCartQuantity, RemoveCart, onEmptyCart }): JSX.Element => {
    const classes = useStyles()
    return (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map(item => (
                    <Grid item xs ={12} sm={4} key={item.id}>
                        <CartItem item={item} UpdateCartQuantity={UpdateCartQuantity} RemoveCart={RemoveCart}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={onEmptyCart}>Empty Cart</Button>
                    <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )
}

export default  FilledCart
