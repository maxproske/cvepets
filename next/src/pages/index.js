import styled from 'styled-components'
import { WelcomeModal } from '../components/Tutorial/WelcomeModal'
import { Hub } from '../components/Hub'
import { useEffect, useState } from 'react'

const IndexPage = () => {
  // Hack
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <></>
  }

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
