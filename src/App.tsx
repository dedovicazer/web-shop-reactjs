import * as React from 'react';
import {Products, NavBar, Cart, Checkout} from './components';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Products />
                    </Route>

                    <Route exact path="/cart">
                        <Cart />
                    </Route>

                    <Route exact path="/checkout">
                        <Checkout />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
