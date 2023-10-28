import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent,
  AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure,
} from '@chakra-ui/react';

function BlockUserConfirm({ onConfirm, blocked }) {
  BlockUserConfirm.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    blocked: PropTypes.bool.isRequired,
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [block, setBlock] = useState(blocked);

  return (
    <>
      <Button colorScheme={block ? 'green' : 'red'} onClick={onOpen}>
        {block ? 'Unblock' : 'Block'}
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {`Confirm ${block ? 'Unblock' : 'Block'}`}
            </AlertDialogHeader>

            <AlertDialogCloseButton />

            <AlertDialogBody>
              {`Are you sure you want to ${block ? 'unblock' : 'block'} this user?`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme={block ? 'green' : 'red'}
                onClick={() => {
                  setBlock(!block);
                  onConfirm(); // This function should handle the user blocking logic
                  onClose();
                }}
              >
                {block ? 'Unblock' : 'Block'}
              </Button>
              <Button onClick={onClose} ml={3}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default BlockUserConfirm;
