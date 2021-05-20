import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apolloSettings/apolloClient'
import { NextPage } from 'next'
import '../modules/core/styles/base.scss'

const MyApp = ({ Component, pageProps }: { Component: NextPage; pageProps: unknown }) => {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
