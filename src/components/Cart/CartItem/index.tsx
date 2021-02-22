import * as React from 'react';
import {FC} from "react";
import useStyles from "./styles";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {removeCart, UpdateCartQuantity} from "../../../redux/cartSlice";
import {ProductType} from "../../../redux/productsSlice";

type Props = {
    item: ProductType

};

const  CartItem: FC<Props> = ({item}): JSX.Element => {
    const dispatch = useDispatch()
    const classes = useStyles()
    return (
        <Card>
            <CardMedia image={item.media.source} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_width_symbol}</Typography>
            </CardContent>

            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => UpdateCartQuantity(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => dispatch(UpdateCartQuantity(item.id, item.quantity + 1))}>+</Button>
                </div>

                <Button variant="contained" type="button" color="secondary" onClick={() => dispatch(removeCart(item.id))}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default  CartItem
