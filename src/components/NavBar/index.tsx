import * as React from 'react';
import {FC} from "react";
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import Logo from "../../assets/commere.jpg";
import useStyles from "./styles";
import {ShoppingCart} from "@material-ui/icons";
import { Link, useLocation } from 'react-router-dom';

type Props = {
    totalItems: number
};

const NavBar: FC<Props> = ({ totalItems }): JSX.Element => {
    const classes = useStyles()
    const location = useLocation()

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
                        {
                            location.pathname === "/" &&  <IconButton component={Link} to="/cart" aria-label={"Show cart items"} color={"inherit"}>
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        }
                    </div>
                </Toolbar>

            </AppBar>
        </>
    )
}

export default NavBar




