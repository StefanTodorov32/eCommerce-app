import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../store/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const { handleLoginUser } = useContext(AuthContext)
  const navigation = useNavigate()
  const { mutate } = useMutation({
    mutationFn: async (values) => {
      await handleLoginUser(values)
    }
  })
  return (
    <Flex align="center" justify="center" h="100vh">
      <Box bg="#2D3748" p={6} rounded="md" w={64}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            mutate(values)
            navigation("/")
          }}
        >
          {({ handleSubmit, errors, touched }) => {
            return (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="center">
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      variant="filled"
                      validate={(value) => {
                        let error;
                        if (!value) {
                          error = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                          error = 'Invalid email address';
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      validate={(value) => {
                        let error;

                        if (value.length < 6) {
                          error = "Password must contain at least 6 characters";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Flex flexDirection={`column`} gap={2}>
                    <Button type="submit" colorScheme="blue" width="full">
                      Login
                    </Button>
                  </Flex>
                </VStack>
              </form>
            )
          }}
        </Formik>
      </Box>
    </Flex>
  );
}
