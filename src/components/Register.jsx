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
import { authApi } from "../services/firebaseService";
export const Register = () => {
    return (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
            <Box bg="white" p={6} rounded="md" w={64}>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={async (values) => {
                        await authApi.register(values)
                    }}
                >
                    {({ handleSubmit, errors, touched }) => {
                        console.log(errors)
                        return (
                            <form onSubmit={handleSubmit}>
                                <VStack spacing={4} align="flex-start">
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
                                    <Button type="submit" colorScheme="purple" width="full">
                                        Login
                                    </Button>
                                </VStack>
                            </form>
                        )
                    }}
                </Formik>
            </Box>
        </Flex>
    );
}
