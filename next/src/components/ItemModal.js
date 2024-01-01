import { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Text,
  Box,
  Image,
  VStack,
  Divider,
  Flex,
} from '@chakra-ui/react'
import { ItemImage } from './ItemImage'
import styled from 'styled-components'

export const ItemModal = ({ item, isOpen, onClose }) => {
  const [nvt, setNvt] = useState(null)

  useEffect(() => {
    const fetchNvt = async () => {
      const response = await fetch(`/api/getNvt?nvtId=${item.id}`)
      const nvtUpdate = await response.json()
      setNvt(nvtUpdate)
    }

    if (item) {
      fetchNvt()
    }

    return () => {
      setNvt(null)
    }
  }, [item])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg="none"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backgroundImage:
            'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)',
          backgroundPosition: '0 0, 2px 2px',
          backgroundSize: '4px 4px',
        }}
      />
      <ModalContent color="gray.800" m="4" p="4">
        <ModalHeader fontSize="md" p="2" textAlign="center">
          {nvt && nvt.name}
        </ModalHeader>
        <Divider />
        <ModalBody pt="6" pb="6" minH="10rem">
          <Flex>
            <Box minW="55px" mr="4">
              <ItemImage item={item} />
            </Box>

            {nvt && <Text fontSize="xs">{nvt.solution.$t || <em>No info</em>}</Text>}
          </Flex>
        </ModalBody>
        <Divider />
        <ModalFooter justifyContent="center">
          <Button
            zIndex={50}
            colorScheme="white"
            color="gray.700"
            background="white"
            variant={'solid'}
            mr={3}
            onClick={onClose}
            minW="10rem"
            boxShadow={'0 1px 3px 1px rgb(0 0 0 / 10%)'}
          >
            Close
          </Button>
        </ModalFooter>
        <Watermark />
      </ModalContent>
    </Modal>
  )
}

const Watermark = styled.div`
  background: url('/img/game/background/Kubernetes_logo_without_workmark.svg') no-repeat;
  background-position: center top;
  background-size: 100% auto;
  filter: grayscale(100%);
  opacity: 0.05;
  position: absolute;
  top: calc(100% - 6rem); // Position the top of the watermark at the middle of the container
  left: 0;
  right: 0;
  bottom: 0; // Extend the watermark to the bottom of the container
  pointer-events: none;
  max-width: 12rem;
  margin: 0 auto;
`
