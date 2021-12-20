import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apolloSettings/apolloClient'
import { NextPage } from 'next'
import '~public/styles/base.scss'
import 'swiper/swiper.min.css'
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/scrollbar/scrollbar.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/effect-cube/effect-cube.min.css"

const MyApp = ({ Component, pageProps }: { Component: NextPage; pageProps: unknown }) => {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
