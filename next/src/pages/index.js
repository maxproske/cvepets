import Image from 'next/image'
import styled from 'styled-components'
import axios from 'axios'
import { useGlobal } from '../context/Global'

const IndexPage = () => {
  const { starter, updateStarter } = useGlobal()

  const runWizard = async () => {
    const res = await axios.post('/api/runWizard')
    const data = res.data

    console.log({ data })
  }

  const getAllTargets = async () => {
    const res = await axios.get('/api/getAllTargets')
    const data = res.data

    console.log({ data })
  }

  const handleStarterClick = (starterUpdate) => {
    updateStarter(starterUpdate)
  }

  return (
    <StyledWrapper>
      <h2>Choose Your Starter</h2>
      <StyledPets>
        <StyledPet onClick={() => handleStarterClick('penguin')}>
          <Image src="/img/game/pets/MmJnpF.gif" width="123" height="123" />
        </StyledPet>
        <StyledPet onClick={() => handleStarterClick('fish')}>
          <Image src="/img/game/pets/P7JZLN.gif" width="123" height="123" />
        </StyledPet>
        <StyledPet onClick={() => handleStarterClick('otter')}>
          <Image src="/img/game/pets/QErA8A.gif" width="123" height="123" />
        </StyledPet>
      </StyledPets>
      {starter && <button onClick={runWizard}>Run Wizard</button>}
      {starter && <button onClick={getAllTargets}>Get All Targets</button>}
    </StyledWrapper>
  )
}

export default IndexPage

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  margin: 1rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 4rem;
  }
`

const StyledPets = styled.div`
  display: flex;
  flex-flow row;
  justify-content: center;
  gap: 1rem;
`

const StyledPet = styled.div`
  border-bottom: 0.5rem solid transparent;

  &:hover {
    border-bottom: 0.5rem solid white;
    cursor: pointer;
  }

  img {
    transform: scale(2);
    image-rendering: pixelated;
  }
`
