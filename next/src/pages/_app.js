import { GlobalContextWrapper } from '../context/Global'
import { GlobalStyles } from '../components/GlobalStyles'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextWrapper>
      <Component {...pageProps} />
      <GlobalStyles />
    </GlobalContextWrapper>
  )
}

export default MyApp
