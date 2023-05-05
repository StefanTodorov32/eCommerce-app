import { useState } from "react";
import { Box, Image, VStack, HStack } from "@chakra-ui/react";

const ImageGallery = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <VStack spacing={4}>
      <Box h="500px" w="500px" overflow="hidden">
        <Image
          width="full"
          height="full"
          src={images[selectedImageIndex]}
          alt={`Image ${selectedImageIndex}`}
          cursor="pointer"
          objectFit="contain"
        />
      </Box>
      <HStack spacing={2}>
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={`Image ${index}`}
            boxSize="80px"
            objectFit="cover"
            onClick={() => handleImageClick(index)}
            cursor="pointer"
            border={index === selectedImageIndex ? "2px solid teal" : "none"}
          />
        ))}
      </HStack>
    </VStack>
  );
};

export default ImageGallery;
