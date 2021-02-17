import * as React from 'react';
import {Products, NavBar} from './components';
import {CartType, ProductType} from "./components/Products/types";
import {useEffect, useState} from "react";
import {commerce} from "./lib/commerce";

function App() {
    const [ products, setProducts ] = useState<ProductType[]>([]);
    const [cart, setCart] = useState<CartType>({total_items: 0});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data)
    }

    const fetchCart: any = async () => {
        setCart(await commerce.cart.retrieve())
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
    <div className="App">
        <NavBar  totalItems={cart.total_items}/>
        <Products products={products} onAddToCart={addToCard}/>
    </div>
  );
}

export default App;
