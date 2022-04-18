import styled from 'styled-components'
import { useGlobal } from '../context/Global'
import { StarterSelector } from '../components/StarterSelector'
import { Wizard } from '../components/Wizard'

const IndexPage = () => {
  const { starter } = useGlobal()

  return <StyledWrapper>{starter ? <Wizard /> : <StarterSelector />}</StyledWrapper>
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
