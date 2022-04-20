import styled from 'styled-components'
import { useGlobal } from '../context/Global'
import { StarterPetSelector } from '../components/StarterPetSelector'
import { Wizard } from '../components/Wizard'

const IndexPage = () => {
  const { pet } = useGlobal()

  return <StyledWrapper>{pet ? <Wizard /> : <StarterPetSelector />}</StyledWrapper>
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
