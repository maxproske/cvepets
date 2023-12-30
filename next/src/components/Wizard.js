import styled from 'styled-components'
import axios from 'axios'
import { Pet } from '../components/Pet'
import { Report } from '../components/Report'
import { useGlobal } from '../context/Global'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { HuntPopover } from './Tutorial/HuntPopover'

export const Wizard = () => {
  const { task, updateTask } = useGlobal()

  const createTask = async () => {
    const res = await axios.post('/api/createTask')
    const taskUpdate = res.data.task

    updateTask(taskUpdate)
  }

  return (
    <StyledWrapper>
      <Pet />
      {!task && (
        <ButtonGroup spacing="6" mt="6">
          <HuntPopover>
            <Button m="0 auto" colorScheme="green" onClick={createTask}>
              Let's Go!
            </Button>
          </HuntPopover>
        </ButtonGroup>
      )}
      {task && <Report />}
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
