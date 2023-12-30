import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Divider,
} from '@chakra-ui/react'
import { useTutorial } from '../../context/TutorialContext'
import styled from 'styled-components'

const Watermark = styled.div`
  background: url('/img/game/background/Kubernetes_logo_without_workmark.svg') no-repeat;
  background-position: left top; // Position the background image to the bottom right
  background-size: 100% auto;
  filter: grayscale(100%);
  opacity: 0.05;
  position: absolute;
  bottom: 0; // Align the watermark to the bottom of the container
  right: 0; // Align the watermark to the right of the container
  pointer-events: none;
  max-width: 12rem;
  transform: translate(3rem, 0rem); // Translate the watermark to the bottom right corner
  width: 100%; // Set width to 50% to cover the bottom right half
  height: 6rem; // Set a fixed height or adjust as needed
  margin: 0; // Reset any margins
`

export const WelcomeModal = () => {
  const { tutorialStep, nextStep } = useTutorial()

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  const handleClose = () => {
    nextStep()
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />

        <ModalContent
          borderRadius="10px"
          boxShadow="0 4px 6px 0 rgba(0, 0, 0, 0.2)"
          m={4}
          p="4"
          maxW="sm"
          overflow="hidden"
        >
          <ModalHeader fontSize="md" fontWeight="bold" color="black" m="0 auto" p="2">
            Welcome to CVE Pets!
          </ModalHeader>
          <Divider my={2} />
          <ModalBody color="black">
            <Text fontSize="sm" pb="2">
              In a moment, you will select a virtual pet, trained to scour the internet for malware and insecure APIs.
              Watch your pet evolve with each vulnerability it discovers and masters.
            </Text>
            <Text fontSize="sm" pb="2">
              Have fun learning about <em>common vulnerabilities and exposures</em> (CVE), and how to prevent them in
              your own web apps!
            </Text>
          </ModalBody>
          <Divider my={2} />
          <ModalFooter>
            <Button colorScheme="green" onClick={handleClose} m="0 auto">
              Continue
            </Button>
          </ModalFooter>
          <Watermark />
        </ModalContent>
      </Modal>
    </>
  )
}
