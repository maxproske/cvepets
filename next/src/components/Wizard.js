import styled from 'styled-components'
import axios from 'axios'
import { Pet } from '../components/Pet'
import { Report } from '../components/Report'
import { useGlobal } from '../context/Global'

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
      {!task && <button onClick={createTask}>Create Task</button>}
      {task && <Report />}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  max-width: 37rem;
  margin: auto;
`
