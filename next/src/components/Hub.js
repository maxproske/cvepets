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

  return (
    <VStack spacing={0} h="100dvh" justifyContent="space-between">
      {tutorialStep === 0 ? (
        <Flex
          flex="1"
          w="full"
          p="4"
          overflowY="auto"
          bgColor="#eee"
          bgImage="url('/img/game/background/tile-pos.png')"
          bgRepeat="repeat"
          bgPosition="0 0"
        ></Flex>
      ) : (
        <>
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

          {/* <HStack bg="white" justifyContent="space-between" p={2} w="full" boxShadow="md">
            <IconButton icon={<ArrowBackIcon />} variant="ghost" aria-label="Return" />
            <HStack spacing={4}>
              <IconButton
                ref={portalButtonRef}
                icon={<AddIcon />}
                variant="solid"
                colorScheme="orange"
                borderRadius="full"
                aria-label="Portal"
              />
            </HStack>
            <IconButton icon={<HamburgerIcon />} variant="ghost" aria-label="Open Menu" />
          </HStack> */}
        </>
      )}
    </VStack>
  )
}
