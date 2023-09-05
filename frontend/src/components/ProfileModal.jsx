import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, IconButton, Image, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter,
  ModalHeader, ModalOverlay, Text, useDisclosure,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

export default function ProfileModal({ user, children }) {
  ProfileModal.propTypes = {
    user: PropTypes.shape().isRequired,
    children: PropTypes.node.isRequired,
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {children ? (
        <span
          role="button"
          tabIndex={0}
          onKeyDown={onOpen}
          onClick={onOpen}
        >
          {children}
        </span>
      ) : (
        <IconButton
          display={{ base: 'flex' }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user.fullName}

          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.fullName}
            />
            <Text
              fontSize={{ base: '28px', md: '30px' }}
              fontFamily="Work Sans"
            >
              Email:
              {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
