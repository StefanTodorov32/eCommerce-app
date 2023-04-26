import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
    Heading,
} from '@chakra-ui/react';
import { Link as DomLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../store/AuthProvider';
import { Profile } from './Profile';
import { AiOutlineShoppingCart } from "react-icons/ai"
import { CgDetailsMore } from "react-icons/cg"
import { FaSignOutAlt } from "react-icons/fa"
import ShoppingCart from './ShoppingCart';

const Links = ['Products', 'Contact', 'About Us', 'Create'];

const NavLink = ({ children }) => (
    <Link
        as={DomLink}
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        to={`/${children.toLowerCase()}`}
    >
        {children}
    </Link>
);

export default function withAction() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { signOutUser, isAuthenticated, user } = useContext(AuthContext)
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
    const [isOpenCart, setIsOpenCart] = useState(false)
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Link
                                as={DomLink}
                                to="/"
                            >
                                <Heading fontSize={20}>eCommerce</Heading>
                            </Link>
                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {isAuthenticated ?
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={
                                            user.photoURL
                                        }
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem
                                        onClick={onOpenModal}
                                        user={user}
                                    >
                                        <CgDetailsMore height="50px" />
                                        <div style={{ marginLeft: "4px" }}>
                                            Account Details
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => setIsOpenCart(true)}
                                    >
                                        <AiOutlineShoppingCart height="50px" />
                                        <div style={{ marginLeft: "4px" }}>
                                            Shopping Cart
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => signOutUser()}
                                    >
                                        <FaSignOutAlt height="50px" />
                                        <div style={{ marginLeft: "4px" }}>
                                            Sign Out
                                        </div>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            :
                            <>
                                <Link
                                    paddingInline={4}
                                    paddingBlock={1}
                                    rounded={25}
                                    bg={'teal.400'}
                                    mr={4}
                                    color={'white'}
                                    fontWeight={600}
                                    fontSize={'md'}
                                    href='/login'
                                    _hover={{
                                        textDecoration: "none",
                                        bg: "teal.500"
                                    }}
                                    as={DomLink}
                                    to="/login"
                                >
                                    Login
                                </Link>
                                <Link
                                    paddingInline={4}
                                    paddingBlock={1}
                                    rounded={25}
                                    bg={'teal.400'}
                                    mr={4}
                                    color={'white'}
                                    fontWeight={600}
                                    fontSize={'md'}
                                    _hover={{
                                        textDecoration: "none",
                                        bg: "teal.500"
                                    }}
                                    as={DomLink}
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </>
                        }

                        <Profile onCloseModal={onCloseModal} isOpenModal={isOpenModal} />
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}

            </Box >
            <ShoppingCart isOpenCart={isOpenCart} setIsOpenCart={setIsOpenCart} />
        </>
    );
}
