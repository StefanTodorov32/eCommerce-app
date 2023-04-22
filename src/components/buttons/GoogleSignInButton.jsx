import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react';

export default function GoogleButton({ signInWithGoogle }) {
    return (
        <Center>
            <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
                onClick={() => signInWithGoogle()}
            >
                <Center>
                    <Text>Sign in with Google</Text>
                </Center>
            </Button>
        </Center>
    );
}
