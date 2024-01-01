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

export const ExploreMorePopover = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { tutorialStep, nextStep } = useTutorial()

  // Automatically open the popover when tutorialStep is 3
  useEffect(() => {
    if (tutorialStep === 3) {
      onOpen()
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
          Done! Next, explore the world wide web. This could take a while, so check back in 15 minutes.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
