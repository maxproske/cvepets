import Image from 'next/image'
import styled from 'styled-components'
import { useGlobal } from '../context/Global'
import { PortalPopover } from './Tutorial/PortalPopover'

export const StarterPetSelector = () => {
  const { updatePet } = useGlobal()

  const handlePetClick = (petUpdate) => {
    updatePet(petUpdate)
  }

  return (
    <StyledWrapper>
      <PortalPopover>
        <StyledPets>
          <StyledPet onClick={() => handlePetClick('penguin')}>
            <div className="pet-image">
              <Image src="/img/game/pets/MmJnpF.gif" width="123" height="123" priority={true} />
            </div>
            <StyledName>Lv.1 Penguin</StyledName>
          </StyledPet>
          <StyledPet onClick={() => handlePetClick('fish')}>
            <div className="pet-image">
              <Image src="/img/game/pets/P7JZLN.gif" width="123" height="123" priority={true} />
            </div>
            <StyledName>Lv.1 Fish</StyledName>
          </StyledPet>
          <StyledPet onClick={() => handlePetClick('otter')}>
            <div className="pet-image">
              <Image src="/img/game/pets/QErA8A.gif" width="123" height="123" priority={true} />
            </div>
            <StyledName>Lv.1 Otter</StyledName>
          </StyledPet>
        </StyledPets>
      </PortalPopover>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
`

const StyledPets = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex-flow row;
  justify-content: center;
  gap: 1rem;

`

const StyledPet = styled.div`
  border: 0.5rem solid transparent; // Default border
  overflow: hidden;

  .pet-image {
    &:hover {
      cursor: pointer;
      animation: hoverAnimation 0.5s ease;
    }
  }

  img {
    transform: scale(2);
    image-rendering: pixelated;
  }

  @keyframes hoverAnimation {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }
`

const StyledName = styled.div`
  text-align: center;
  font-weight: bold;
`
