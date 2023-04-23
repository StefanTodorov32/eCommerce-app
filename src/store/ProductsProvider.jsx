import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { firestoreService } from "../services/firebaseService";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const products = await firestoreService.getProducts();
            setProducts(products);
        }
        getProducts()
    }, [])
    return (
        <ProductsContext.Provider value={{
            products
        }}>
            {children}
        </ProductsContext.Provider>
    )

}