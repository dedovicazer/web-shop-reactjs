import * as React from 'react';
import {FC} from "react";
import  {Typography, List, ListItem, ListItemText} from "@material-ui/core";

type Props = {
    token: any

};

const  Review: FC<Props> = ({ token }): JSX.Element => {
    return (
        <>
           <Typography variant="h6" gutterBottom>Order summary</Typography>
            <List disablePadding>
                {token.live.line_items.map((product: { name: string, quantity: number, line_total: {formatted_with_symbol: string} }) => (
                    <ListItem style ={{padding: '10px 0'}} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity : ${product.quantity}`}/>
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ) )}
                <ListItem style ={{padding: '10px 0'}}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle2" style={{fontWeight: 700}}>
                        {token.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default  Review
