import { useContext, useState } from "react";
import {
    Box,
    Flex,
    Text,
    IconButton,
    CloseButton,
    useColorModeValue,
} from "@chakra-ui/react";
import { CartContext } from "../store/CartProvider";

const CartItem = ({ item, handleRemove }) => {
    return (
        <Flex p={2} borderBottom="1px" borderColor="gray.200">
            <Box flex={1}>
                <Text fontWeight="semibold">{item.name}</Text>
                <Text fontSize="sm" color="gray.500">
                    {item.quantity} x {item.price}
                </Text>
            </Box>
            <IconButton
                icon={<CloseButton />}
                onClick={() => handleRemove(item.id)}
                variant="ghost"
                size="xs"
                aria-label="Remove item"
            />
        </Flex>
    );
};

const ShoppingCart = ({ handleRemove, isOpenCart, setIsOpenCart }) => {
    const { items } = useContext(CartContext)
    const bg = useColorModeValue("white", "gray.800");
    const color = useColorModeValue("gray.800", "white");
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <>
            <Box
                position="fixed"
                top={0}
                right={0}
                h="100vh"
                w="300px"
                bg={bg}
                color={color}
                overflowY="scroll"
                boxShadow="lg"
                zIndex={999}
                transform={isOpenCart ? "translateX(0)" : "translateX(100%)"}
                transition="transform 0.3s"
            >
                <Flex p={2} borderBottom="1px" borderColor="gray.200">
                    <Text fontWeight="semibold" flex={1}>
                        Shopping Cart
                    </Text>
                    <IconButton
                        icon={<CloseButton />}
                        onClick={() => setIsOpenCart(false)}
                        variant="ghost"
                        size="xs"
                        aria-label="Close cart"
                    />
                </Flex>
                {items.map((item) => (
                    <CartItem key={item.id} item={item} handleRemove={handleRemove} />
                ))}
                {items.length === 0 && (
                    <Box p={2}>
                        <Text>There are no items in your cart.</Text>
                    </Box>
                )}
                {items.length > 0 && (
                    <Box p={2}>
                        <Text fontWeight="semibold">
                            Total: {total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                        </Text>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default ShoppingCart;
