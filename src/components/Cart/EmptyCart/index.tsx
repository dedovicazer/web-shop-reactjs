import * as React from 'react';
import {FC} from "react";
import {Typography} from "@material-ui/core";
import { Link } from 'react-router-dom';

type Props = {

};

const  EmptyCart: FC<Props> = (): JSX.Element => {
    return (
        <>
            <Typography variant="subtitle1">You have no items in your shopping cart, start to add some!
                <Link to="/">Start to add something '&gt;'</Link>
            </Typography>
        </>
    )
}

export default  EmptyCart
