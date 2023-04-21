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
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { Link as DomLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={`/${children.toLowerCase()}`}>
        {children}
    </Link>
)
    ;

export default function withAction() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, signOutUser } = useContext(AuthContext)
    console.log(user)
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
                        <Box>Logo</Box>
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
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Account Details</MenuItem>
                                <MenuItem>Sign Out</MenuItem>
                            </MenuList>
                        </Menu>
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
                                onClick={() => signOutUser()}
                            >
                                SignOut
                            </Link>
                        </>
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
            </Box>
        </>
    );
}
