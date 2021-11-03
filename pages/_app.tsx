import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Container from '../components/container'

function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
    <Container>
      <Component {...pageProps} />
    </Container>

  )
}

export default MyApp
