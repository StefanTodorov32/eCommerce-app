export const showToastNotification = (toast, title, description, status, duration, isClosable) => {
    return toast({
        title, description, status, duration, isClosable
    })
}