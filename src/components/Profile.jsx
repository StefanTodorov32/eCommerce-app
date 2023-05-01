import { Button } from '@chakra-ui/button'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { useContext } from 'react'
import { AuthContext } from '../store/AuthProvider'
import ProfileForm from './ProfileForm'

export const Profile = ({ isOpenModal, onCloseModal }) => {
    const { user } = useContext(AuthContext)
    return (
        <Modal blockScrollOnMount={false} isOpen={isOpenModal} onClose={onCloseModal} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Account Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ProfileForm onCloseModal={onCloseModal} user={user} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
