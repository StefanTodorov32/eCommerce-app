import {
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Link,
} from '@chakra-ui/react';
import { Link as DomLink } from 'react-router-dom';

export default function Home() {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    Meeting scheduling{' '}
                    <Text as={'span'} color={'blue.600'}>
                        made easy
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Never miss a meeting. Never be late for one too. Keep track of your
                    meetings and receive smart reminders in appropriate times. Read your
                    smart “Daily Agenda” every morning.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Link
                        as={DomLink}
                        rounded={'full'}
                        px={6}
                        py={3}
                        color="whiteAlpha.900"
                        bg={'blue.600'}
                        _hover={{ bg: 'blue.700' }}
                        to="/products"
                        >
                        Get started
                    </Link>
                </Stack>
            </Stack>
        </Container>
    );
}
