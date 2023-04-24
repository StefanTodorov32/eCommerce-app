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
    const getProduct = async (id) => {
        const product = await firestoreService.getProductById(id);
        return product;
    }
    return (
        <ProductsContext.Provider value={{
            products,
            getProduct
        }}>
            {children}
        </ProductsContext.Provider>
    )

}