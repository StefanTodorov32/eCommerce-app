import { Flex, Heading, Spinner, Box, Image, Text, Grid, Button, useDisclosure, Container } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsContext } from '../store/ProductsProvider'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../store/CartProvider'
import ImageGallery from './ProductImageGallery'

export const ProductDetails = () => {
  const { getProduct } = useContext(ProductsContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleAddItem } = useContext(CartContext)
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProduct(id),
  })
  return (
    <>
      {isLoading &&
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Flex>
      }
      <Box maxWidth="800px" mx="auto" mt="4" mb={20}>
        <Box d="flex" flexDirection={{ base: "column", lg: "row" }}>
          {/* <Box flex="1" mr={{ lg: "8" }}>
            <Image src={data?.productImages[0]} alt={data?.productName} mb="4" width="400px" height="500px" borderRadius="20px" onClick={onOpen} />
            <Box flex="1">
              <Grid
                templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
                gap="4"
              >
                {data?.productImages.slice(1).map((image, index) => (
                  <Image key={index} src={image} alt={data?.productName} mb="4" borderRadius="20px" />
                ))}
              </Grid>
            </Box> */}
          <Container marginBottom={20}>
            {data && <ImageGallery images={data.productImages} />}
          </Container>
          <Box d="flex" justifyContent="space-between" mb="4">
            <Flex>
              <Heading as="h1" size="lg" mb="0">
                {data?.productName}
              </Heading>
              <Button colorScheme="red" ml={5} size="lg">Buy Now</Button>
              <Button colorScheme="yellow" ml={5} size="lg" onClick={() => handleAddItem(data)}>Add to Cart</Button>
            </Flex>
            <Text fontSize="xl">${data?.price}</Text>
          </Box>
          <Text fontSize="md" color="gray.500" mb="4">
            Category: {data?.productCategory} | Weight: {data?.weight}kg
          </Text>
          <Text fontSize="lg">{data?.productDescription}</Text>
        </Box>
      </Box>
    </>
  )
}