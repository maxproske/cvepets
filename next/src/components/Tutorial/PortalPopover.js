import {
  IconButton,
  AddIcon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  PopoverArrow,
} from '@chakra-ui/react'
import { useTutorial } from '../../context/TutorialContext'
import { useEffect } from 'react'

export const PortalPopover = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { tutorialStep, nextStep } = useTutorial()

  // Automatically open the popover when tutorialStep is 1
  useEffect(() => {
    if (tutorialStep === 1) {
      onOpen()
    } else {
      handleClose()
    }
  }, [tutorialStep, onOpen, onClose])

  const handleClose = () => {
    nextStep()
    onClose()
  }

  return (
    <Popover placement="top" returnFocusOnClose={false} isOpen={isOpen} onClose={handleClose} closeOnBlur={false}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody color="black" textAlign="center">
          Choose your starter!
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
