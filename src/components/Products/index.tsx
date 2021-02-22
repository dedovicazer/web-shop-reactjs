import * as React from 'react';
import {FC, useEffect} from "react";
import Grid from "@material-ui/core/Grid"
import Product from "./Product";
import useStyles from "./styles"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {fetchProducts} from "../../redux/productsSlice";
import {fetchCart} from "../../redux/cartSlice";


type Props = {

};

const Products: FC<Props> = (): JSX.Element => {
    const { products } = useSelector((state: RootState) => state.rootReducer.products)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCart())
    }, [])

    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div  className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((product, index) => <Grid key={index} item xs={12} sm={6} md={4}>
                    <Product product={product}/>
                </Grid>)}
            </Grid>
        </main>
    )
}

export default Products
