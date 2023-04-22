import { Button } from '@chakra-ui/button'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React from 'react'

export const Profile = ({ isOpenModal, onCloseModal }) => {
    return (
        <Modal blockScrollOnMount={false} isOpen={isOpenModal} onClose={onCloseModal} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onCloseModal}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
