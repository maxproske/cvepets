import styled from 'styled-components'
import axios from 'axios'
import { Pet } from '../components/Pet'
import { Report } from '../components/Report'
import { useGlobal } from '../context/Global'
import { Button, ButtonGroup, Text } from '@chakra-ui/react'
import { HuntPopover } from './Tutorial/HuntPopover'
import { useState } from 'react'

export const Wizard = () => {
  const { task, updateTask } = useGlobal()
  const [clicked, setClicked] = useState(!!task)

  const createTask = async ({ random = false }) => {
    setClicked(true)

    const res = await axios.post('/api/createTask', { random })
    const taskUpdate = res.data.task

    updateTask(taskUpdate)
  }

  console.log({ task, clicked })

  return (
    <StyledWrapper>
      <Pet />
      {!task && !clicked && (
        <ButtonGroup spacing="6" mt="6">
          <HuntPopover>
            <Button m="0 auto" colorScheme="orange" onClick={createTask}>
              Begin Exploration
            </Button>
          </HuntPopover>
        </ButtonGroup>
      )}
      {task && <Report createTask={createTask} />}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`
