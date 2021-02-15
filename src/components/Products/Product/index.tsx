import * as React from 'react';
import {FC} from "react";
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import useStyles from "./styles"
import {ProductType} from "../tpes";
import {AddShoppingCart} from "@material-ui/icons";


type Props = {
    product: ProductType
};


const Product: FC<Props> = ({product}): JSX.Element => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant={"h5"} gutterBottom>
                        {product.name}
                    </Typography>

                    <Typography variant={"h5"}>
                        {product.price}
                    </Typography>
                    <Typography variant={"body2"} color={"textSecondary"}>{product.description}</Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Card">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}


export default Product



