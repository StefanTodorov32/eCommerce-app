import { createContext, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const handleAddItem = (item) => {
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

    const total = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                handleAddItem,
                handleRemoveItem,
                handleClearCart,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}