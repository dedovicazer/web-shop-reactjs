import * as React from 'react';
import {FC, JSXElementConstructor, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid"
import {ProductType} from "./types";
import Product from "./Product";
import useStyles from "./styles"
import {commerce} from "../../lib/commerce";


type Props = {
    products: ProductType[]
    onAddToCart: any
};

const Products: FC<Props> = ({ products, onAddToCart }): JSX.Element => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div  className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((product, index) => <Grid key={index} item xs={12} sm={6} md={4}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>)}
            </Grid>
        </main>
    )
}

export default Products
