import * as React from 'react';
import {FC} from "react";
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import Logo from "../../assets/commere.jpg";
import useStyles from "./styles";
import {ShoppingCart} from "@material-ui/icons";
import { Link, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

type Props = {

};

const NavBar: FC<Props> = (): JSX.Element => {
    const classes = useStyles()
    const location = useLocation()
    const { cart } = useSelector((state:RootState) => state.rootReducer.cart)

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
                                <Badge badgeContent={cart.total_items} color="secondary">
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




