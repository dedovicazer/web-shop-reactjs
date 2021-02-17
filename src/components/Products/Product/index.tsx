import * as React from 'react';
import {FC} from "react";
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import useStyles from "./styles"
import {ProductType} from "../types";
import {AddShoppingCart} from "@material-ui/icons";


type Props = {
    product: ProductType
    onAddToCart: (id: string, quantity: number) => void
};


const Product: FC<Props> = ({product, onAddToCart}): JSX.Element => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        ${product.price.formatted}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart"  onClick={ ()=>{ onAddToCart(product.id, 1) } }>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}


export default Product




