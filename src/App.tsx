import * as React from 'react';
import {Products, NavBar} from './components';
import {ProductType} from "./components/Products/types";
import {useEffect, useState} from "react";
import {commerce} from "./lib/commerce";

function App() {
    const [ products, setProducts ] = useState([])

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

  return (
    <div className="App">
        <NavBar />
        <Products products={products}/>
    </div>
  );
}

export default App;
