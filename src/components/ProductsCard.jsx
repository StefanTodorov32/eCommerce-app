import { Button, ButtonGroup } from '@chakra-ui/button'
import { Card, CardBody, CardFooter } from '@chakra-ui/card'
import { Image } from '@chakra-ui/image'
import { Divider, Heading, Stack, Text } from '@chakra-ui/layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ProductsCard = ({ productImages, productName, productDescription, price, id }) => {
    const navigation = useNavigate()
    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src={`${productImages[0]}`}
                    alt={productName}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{productName}</Heading>
                    <Text>
                        {productDescription}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        ${price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'
                        onClick={() => navigation(`/product/${id}`)}
                    >
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Add to cart
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}
