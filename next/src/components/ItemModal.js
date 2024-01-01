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
  Tag,
  Wrap,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { ItemImage } from './ItemImage'
import styled from 'styled-components'

// Parses the tags string into an object
const parseTags = (tagsString) => {
  const tags = {}
  tagsString.split('|').forEach((tag) => {
    const [key, value] = tag.split('=')
    tags[key.trim()] = value.trim()
  })
  return tags
}

const TagsDisplay = ({ tagsString }) => {
  const tags = parseTags(tagsString)
  return (
    <>
      {Object.entries(tags).map(([key, value]) => {
        if (key === 'summary') {
          return (
            <Text fontSize="xs" key={key}>
              {value}
            </Text>
          )
        }
      })}
    </>
  )
}

const getSeverityLabel = ({ severity }) => {
  let label
  if (severity === 0.0) label = 'Common'
  else if (severity <= 3.9) label = 'Uncommon'
  else if (severity <= 6.9) label = 'Rare'
  else if (severity <= 8.9) label = 'Epic'
  else label = 'Legendary'

  return label
}

const getBackgroundColor = ({ severity, qod = '100' }) => {
  let color
  if (severity === 0.0) color = '#d3d3d3' // Pastel grey
  else if (severity <= 3.9) color = '#b2fba5' // Pastel green
  else if (severity <= 6.9) color = '#add8e6' // Pastel blue
  else if (severity <= 8.9) color = '#ffd580' // Pastel orange
  else color = '#ff9999' // Pastel red

  const opacity = qod / 100 // Assuming QOD is on a scale of 0 to 100
  return `rgba(${hexToRgb(color)}, ${opacity})`
}

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.substring(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `${r},${g},${b}`
}

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

            <VStack>
              {item && (
                <Badge
                  alignSelf="flex-start"
                  fontSize="xs"
                  pl="4"
                  pr="4"
                  background={getBackgroundColor({ severity: +item.severity })}
                >
                  {getSeverityLabel({ severity: +item.severity })}
                </Badge>
              )}

              {nvt && nvt.tags && <TagsDisplay tagsString={nvt.tags} />}

              {nvt?.solution?.$t && (
                <Accordion allowToggle w="100%">
                  <AccordionItem>
                    <AccordionButton p="0" mt="2" mb="2">
                      <Box flex="1" textAlign="left" fontSize="xs">
                        <strong>Solution</strong>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel p="0" fontSize="xs" pb={4}>
                      {nvt.solution.$t}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}
            </VStack>
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
