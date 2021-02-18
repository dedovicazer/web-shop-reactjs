import * as React from 'react';
import {Products, NavBar, Cart} from './components';
import {CartType, ProductType} from "./components/Products/types";
import {useEffect, useState} from "react";
import {commerce} from "./lib/commerce";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [cart, setCart] = useState<any>({total_items: 0});

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();
        setProducts(data)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const UpdateCartQuantity = async (productId: string, quantity: number) => {
        const { cart } = await commerce.cart.update(productId, { quantity })
        setCart(cart)
    }

    const RemoveCart = async (productId: string) => {
        const { cart } = await  commerce.cart.remove(productId)
        setCart(cart)
    }

    const onEmptyCart = async () => {
        const { cart } = await  commerce.cart.empty()
        setCart(cart)
    }

    const addToCard = async (productId: string, quantity: number) => {
        const item = await commerce.cart.add(productId, quantity)
        setCart(item.cart);
    }
    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    return (

        <Router>
            <div className="App">
                <NavBar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={addToCard}/>
                    </Route>

                    <Route>
                        <Cart cart={cart} UpdateCartQuantity={UpdateCartQuantity} RemoveCart={RemoveCart} onEmptyCart={onEmptyCart}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
