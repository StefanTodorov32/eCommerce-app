import { Button, ButtonGroup } from '@chakra-ui/button'
import { Card, CardBody, CardFooter } from '@chakra-ui/card'
import { Image } from '@chakra-ui/image'
import { Divider, Heading, Stack, Text } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProductsCard = ({ productImages, productName, productDescription, price, id }) => {
    const navigation = useNavigate()
    const [mainImage, setMainImage] = useState(productImages[0])
    return (
        <Card maxW='sm'>
            <CardBody
                onClick={() => navigation(`/product/${id}`)}
                onMouseOver={() => setMainImage(productImages[1])}
                onMouseLeave={() => setMainImage(productImages[0])}
            >
                <Image
                    src={mainImage}
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
        </Card>
    )
}
