import * as React from 'react';
import {FC} from "react";
import {Button, CircularProgress, Divider, Typography} from "@material-ui/core";
import useStyles from "../../CheckoutForm/styles"
import {Link} from "react-router-dom";

type Props = {
    order: any
};

const Conformation: FC<Props> = ({order}): JSX.Element => {
    const classes = useStyles()
    return order.customer ? (
        <>
            <Typography variant="h5">Thank you for purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            <br/>
            <Button variant="outlined" component={Link} to="/">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )
}



export default Conformation
