import { GlobalContextWrapper } from '../context/Global'
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalStyles } from '../components/GlobalStyles'
import { TutorialProvider } from '../context/TutorialContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CVE Pets</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#00bcd4" />
      </Head>
      <GlobalContextWrapper>
        <TutorialProvider>
          <ChakraProvider>
            <Component {...pageProps} />
            <GlobalStyles />
          </ChakraProvider>
        </TutorialProvider>
      </GlobalContextWrapper>
    </>
  )
}

export default MyApp
