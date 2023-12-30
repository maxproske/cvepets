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

export const HuntPopover = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { tutorialStep, nextStep } = useTutorial()

  // Automatically open the popover when tutorialStep is 2
  useEffect(() => {
    if (tutorialStep === 2) {
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
    <Popover placement="bottom" returnFocusOnClose={false} isOpen={isOpen} onClose={handleClose} closeOnBlur={false}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody color="black" textAlign="center">
          Ready to explore? Start your pet's journey by checking that your WiFi is secure against threats.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
