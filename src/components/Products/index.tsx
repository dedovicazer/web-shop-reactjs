import * as React from 'react';
import {FC} from "react";
import Grid from "@material-ui/core/Grid"
import {ProductType} from "./tpes";
import Product from "./Product";
import useStyles from "./styles"


type Props = {};

const products: ProductType[] = [
    {
        id: 1,
        name: "MackBook",
        description: "Amazing mackboock",
        price: "1300$",
        image: "https://cdn1.it4profit.com/AfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM/resize:fill:540/bg:f6f6f6/q:100/plain/s3://catalog-products/201111082120971458/201210170016351443.png@webp"
    },
    {
        id: 3,
        name: "Shoes",
        description: "Running shoes",
        price: "5$",
        image: "http://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_WL_RN_SF_PDP_Natural_Grey_BTY_10b4c383-7fc6-4b58-8b3f-6d05cef0369c_600x600.png?v=1610061677"
    }
]

const Products: FC<Props> = (props: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div  className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map(prod => <Grid key={prod.id} item xs={12} sm={6} md={4}>
                    <Product product={prod}/>
                </Grid>)}
            </Grid>
        </main>
    )
}

export default Products
