import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Textarea,
    Container,
} from "@chakra-ui/react";
import { AuthContext } from "../store/AuthProvider";

const ProfileForm = ({ onCloseModal, user }) => {
    const { handleProfileUpdate } = useContext(AuthContext)
    return (
        <Container p={0} mb={6}>
            <Formik
                initialValues={{
                    firstName: user.displayName.split(" ")[0],
                    secondName: user.displayName.split(" ")[1],
                    email: user.email,
                    photoURL: user.photoURL
                }}
                onSubmit={(values, actions) => handleProfileUpdate(values, actions)}
            >
                {(props) => (
                    <Form>
                        <Field name="firstName">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={form.errors.firstName && form.touched.firstName}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                                    <Input {...field} id="firstName" placeholder="Enter your first name" />
                                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="secondName">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={form.errors.secondName && form.touched.secondName}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="secondName">Second Name</FormLabel>
                                    <Input {...field} id="secondName" placeholder="Enter your second name" />
                                    <FormErrorMessage>{form.errors.secondName}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="email">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={form.errors.email && form.touched.email}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        placeholder="Enter your email"
                                    />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="photoURL">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={form.errors.photoURL && form.touched.photoURL}
                                    mt={4}
                                >
                                    <FormLabel htmlFor="photoURL">photo Url</FormLabel>
                                    <Input
                                        {...field}
                                        id="photoURL"
                                        placeholder="Enter your photo url"
                                    />
                                    <FormErrorMessage>{form.errors.photoURL}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Update Profile
                        </Button>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            onClick={() => onCloseModal(false)}
                            ml={4}
                        >
                            Close
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default ProfileForm;
