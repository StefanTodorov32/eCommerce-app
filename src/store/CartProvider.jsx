import { createContext, useEffect, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("cartItems", JSON.stringify(items));
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [items]);


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
    return (
        <CartContext.Provider
            value={{
                items,
                handleAddItem,
                handleRemoveItem,
                handleClearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}