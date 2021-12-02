import Image from 'next/image'
import styled from 'styled-components'
import axios from 'axios'

export default function Home() {
  const onClick = async () => {
    const res = await axios.post('/api/runWizard')
    const data = res.data
    console.log({ data })
  }

  return (
    <StyledWrapper>
      <h2>Choose Your Starter</h2>
      <StyledPets>
        <StyledPet>
          <Image src="/img/game/pets/MmJnpF.gif" width="123" height="123" />
        </StyledPet>
        <StyledPet>
          <Image src="/img/game/pets/P7JZLN.gif" width="123" height="123" />
        </StyledPet>
        <StyledPet>
          <Image src="/img/game/pets/QErA8A.gif" width="123" height="123" />
        </StyledPet>
      </StyledPets>
    </StyledWrapper>
  )
}

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
