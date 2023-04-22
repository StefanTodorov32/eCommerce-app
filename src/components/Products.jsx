import { Box, SimpleGrid } from '@chakra-ui/layout'
import React from 'react'
import { ProductsCard } from './ProductsCard'

export const Products = () => {
  return (
    <SimpleGrid columns={3} spacing={10} p={20} w="fit-content" m="auto">
      {Array.from([1, 2, 3, 4, 5]).map(x => <ProductsCard />)}
    </SimpleGrid>
  )
}
