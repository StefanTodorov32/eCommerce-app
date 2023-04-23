import { Box, SimpleGrid } from '@chakra-ui/layout'
import React, { useContext } from 'react'
import { ProductsCard } from './ProductsCard'
import { ProductsContext } from '../store/ProductsProvider'

export const Products = () => {
  const { products } = useContext(ProductsContext)
  return (
    <SimpleGrid columns={3} spacing={10} p={20} w="fit-content" m="auto">
      {products.map((x, i) => <ProductsCard key={i} {...x} />)}
    </SimpleGrid>
  )
}
