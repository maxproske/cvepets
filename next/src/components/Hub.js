import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  useDisclosure,
} from '@chakra-ui/react'
import {
  ArrowBackIcon,
  HamburgerIcon,
  HomeIcon,
  ViewIcon,
  ShoppingBagIcon,
  ExternalLinkIcon,
  AddIcon,
} from '@chakra-ui/icons'
import styled from 'styled-components'
import { useGlobal } from '../context/Global'
import { useTutorial } from '../context/TutorialContext'
import { useRef } from 'react'
import { StarterPetSelector } from './StarterPetSelector'
import { Wizard } from './Wizard'

export const Hub = () => {
  const { pet } = useGlobal()
  const { tutorialStep } = useTutorial()
  const portalButtonRef = useRef()

  const clearLocalStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <VStack spacing={0} h="100dvh" justifyContent="space-between">
      <Flex direction="column" alignItems="flex-start" w="full" position="relative">
        <Button onClick={clearLocalStorage} colorScheme="ghost" position="absolute" top="4" left="4" zIndex="overlay">
          Reset
        </Button>
      </Flex>

      <Flex
        flex="1"
        w="full"
        p="4"
        overflowY="auto"
        bgColor="#00bcd4"
        bgImage="url('/img/game/background/tile-pos.png')"
        bgRepeat="repeat"
        bgPosition="0 0"
        alignItems="center"
      >
        {pet ? <Wizard /> : <StarterPetSelector />}
      </Flex>
    </VStack>
  )
}
