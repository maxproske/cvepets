import styled from 'styled-components'
import { WelcomeModal } from '../components/Tutorial/WelcomeModal'
import { Hub } from '../components/Hub'

const IndexPage = () => {
  return (
    <StyledWrapper>
      <WelcomeModal />
      <Hub />
    </StyledWrapper>
  )
}

export default IndexPage

const StyledWrapper = styled.main`
  max-width: 27rem;
  margin: 0 auto;
`
