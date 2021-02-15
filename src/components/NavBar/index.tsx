import * as React from 'react';
import {FC} from "react";
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import Logo from "../../assets/commere.jpg";
import useStyles from "./styles";
import {ShoppingCart} from "@material-ui/icons";

type Props = {};

const NavBar: FC<Props> = (props: Props): JSX.Element => {
    const classes = useStyles()
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={Logo} alt="Commerce.js" width={25} className={classes.image}/>
                        Commerce.js
                    </Typography>
                    <div className={classes.grow}/>
                    <div>
                        <IconButton aria-label={"Show cart items"} color={"inherit"}>
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>

            </AppBar>
        </>
    )
}

export default NavBar




