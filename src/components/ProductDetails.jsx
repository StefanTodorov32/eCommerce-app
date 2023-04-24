import { Container, Heading } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsContext } from '../store/ProductsProvider'
import { useQuery } from '@tanstack/react-query'

export const ProductDetails = () => {
    const { getProduct } = useContext(ProductsContext)
    const { id } = useParams()
    const { data } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProduct(id),
    })
    console.log(data)
    return (
        <>
        {data && <Container centerContent>
            <Heading>{data.productName}</Heading>
        </Container>}
        </>
    )
}
