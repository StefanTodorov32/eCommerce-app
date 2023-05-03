import { createContext, useEffect, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [total, setTotal] = useState(0)
    const [items, setItems] = useState(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const handleAddItem = (item) => {
        item.quantity = 1
        const itemIndex = items.findIndex((i) => i.id === item.id);
        if (itemIndex === -1) {
            setItems([...items, item]);
        } else {
            const newItems = [...items];
            newItems[itemIndex].quantity += item.quantity;
            setItems(newItems);
        }
    };

    const handleRemoveItem = (itemId) => {
        const itemIndex = items.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
            const newItems = [...items];
            newItems.splice(itemIndex, 1);
            setItems(newItems);
        }
    };

    const handleClearCart = () => {
        setItems([]);
    };
    useEffect(() => {
        const sum = items.reduce((acc, item) => {
            return acc + item.quantity * item.price;
        }, 0);
        setTotal(sum)
    }, [items])
    return (
        <CartContext.Provider
            value={{
                items,
                handleAddItem,
                handleRemoveItem,
                handleClearCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
}