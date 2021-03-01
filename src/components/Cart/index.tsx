import * as React from 'react';
import {FC, useEffect} from "react";
import  {Container, Typography} from "@material-ui/core";
import { EmptyCart, FilledCart } from "../../components"
import useStyles from "./styles"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {fetchProducts} from "../../redux/productsSlice";
import {fetchCart} from "../../redux/cartSlice";

type Props = {

};



const Cart: FC<Props> = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCart())
    }, [])

    const { cart } = useSelector((state: RootState) => state.rootReducer.cart)
    const classes = useStyles()

    if(!cart.line_items) return <>"Loading..."</>

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3">Your shopping cart </Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart cart={cart} />}
        </Container>
    )
}

export default Cart
