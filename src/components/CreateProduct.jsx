import React from "react";
import { Formik, Form, Field } from "formik";
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Container,
} from "@chakra-ui/react";

export const CreateProduct = () => {
    const initialValues = {
        name: "",
        price: "",
        description: "",
    };

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Required";
        }

        if (!values.price) {
            errors.price = "Required";
        } else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(values.price)) {
            errors.price = "Invalid price format";
        }

        if (!values.description) {
            errors.description = "Required";
        }

        return errors;
    };

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
    };

    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
            {(formik) => (
                <Container mt={10}>
                    <Form>
                        <Field name="name">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Input {...field} id="name" placeholder="Product name" />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="price">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.price && form.touched.price}>
                                    <FormLabel htmlFor="price">Price</FormLabel>
                                    <Input {...field} id="price" placeholder="Product price" />
                                    <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="description">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={form.errors.description && form.touched.description}
                                >
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <Input
                                        {...field}
                                        id="description"
                                        placeholder="Product description"
                                    />
                                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={formik.isSubmitting}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                </Container>
            )}
        </Formik>
    );
};