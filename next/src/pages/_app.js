import { GlobalContextWrapper } from '../context/Global'
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalStyles } from '../components/GlobalStyles'
import { TutorialProvider } from '../context/TutorialContext'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextWrapper>
      <TutorialProvider>
        <ChakraProvider>
          <Component {...pageProps} />
          <GlobalStyles />
        </ChakraProvider>
      </TutorialProvider>
    </GlobalContextWrapper>
  )
}

export default MyApp
