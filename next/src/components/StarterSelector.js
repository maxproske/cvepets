import Image from 'next/image'
import styled from 'styled-components'
import { useGlobal } from '../context/Global'

export const StarterSelector = () => {
  const { updateStarter } = useGlobal()

  const handleStarterClick = (starterUpdate) => {
    updateStarter(starterUpdate)
  }

  return (
    <StyledWrapper>
      <h2>Choose Your Starter</h2>
      <StyledPets>
        <StyledPet onClick={() => handleStarterClick('penguin')}>
          <Image src="/img/game/pets/MmJnpF.gif" width="123" height="123" />
          <StyledName>Lv.1 Penguin</StyledName>
        </StyledPet>
        <StyledPet onClick={() => handleStarterClick('fish')}>
          <Image src="/img/game/pets/P7JZLN.gif" width="123" height="123" />
          <StyledName>Lv.1 Fish</StyledName>
        </StyledPet>
        <StyledPet onClick={() => handleStarterClick('otter')}>
          <Image src="/img/game/pets/QErA8A.gif" width="123" height="123" />
          <StyledName>Lv.1 Otter</StyledName>
        </StyledPet>
      </StyledPets>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div``

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
const StyledName = styled.div`
  text-align: center;
`
