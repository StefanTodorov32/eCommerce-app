import { useContext, useState } from "react";
import {
    Box,
    Flex,
    Text,
    IconButton,
    CloseButton,
    useColorModeValue,
    Button,
    Image,
} from "@chakra-ui/react";
import { CartContext } from "../store/CartProvider";

const CartItem = ({ item, handleRemoveItem }) => {
    return (
        <Flex p={2} borderBottom="1px" borderColor="gray.200">
            <Box flex={1}>
                <Text fontWeight="semibold">{item.productName}</Text>
                <Text fontSize="md" color="black">
                    {item.quantity} x {item.price}$
                </Text>
                <Image src={item.productImages[0]} alt={item.productName} mb="4" borderRadius="20px" />
            </Box>
            <IconButton
                icon={<CloseButton />}
                onClick={() => handleRemoveItem(item.id)}
                variant="ghost"
                size="xs"
                aria-label="Remove item"
            />
        </Flex>
    );
};

const ShoppingCart = ({ isOpenCart, setIsOpenCart }) => {
    const { items, handleRemoveItem, total, handleClearCart } = useContext(CartContext)
    const bg = useColorModeValue("white", "gray.800");
    const color = useColorModeValue("gray.800", "white");
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
                        onClick={() => setIsOpenCart(false)}
                        icon={<CloseButton />}
                        variant="ghost"
                        size="xs"
                        aria-label="Close cart"
                    />
                </Flex>
                {items.map((item) => (
                    <CartItem key={item.id} item={item} handleRemoveItem={handleRemoveItem} />
                ))}
                {items.length === 0 && (
                    <Box p={2}>
                        <Text>There are no items in your cart.</Text>
                    </Box>
                )}
                {items.length > 0 && (
                    <>
                        <Box p={2}>
                            <Text fontWeight="semibold">
                                Total: {total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                            </Text>
                        </Box>
                        <Flex justifyContent="space-between">
                            <Button size="md" colorScheme="red" m="2"
                                onClick={() => handleClearCart()}
                            >
                                Clear
                            </Button>
                            <Button size="md" colorScheme="blue" m="2" >
                                Checkout
                            </Button>
                        </Flex>
                    </>
                )}

            </Box>
        </>
    );
};

export default ShoppingCart;
