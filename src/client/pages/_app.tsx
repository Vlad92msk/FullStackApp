import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apolloSettings/apolloClient'
import { NextPage } from 'next'
import '~public/styles/base.scss'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/scrollbar/scrollbar.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/effect-cube/effect-cube.min.css'
import { storageSet } from '@shared/utils'

/**
 * Предотвращает ошибку
 * Expected server HTML to contain a matching <div> in <div>.
 */
// function SafeHydrate({ children }) {
//   return (
//     <div suppressHydrationWarning>
//       {typeof window === 'undefined' ? null : children}
//     </div>
//   )
// }


const MyApp = ({ Component, pageProps }: { Component: NextPage; pageProps: unknown }) => {
  if (typeof window !== 'undefined') {
    /**
     * TODO: сделаь переключение
     */
    storageSet('userLanguage', 'en')
  }

  const apolloClient = useApollo(pageProps)
  // if (typeof window === 'undefined') return <div>Loading...</div>

  return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
  )
}

export default MyApp
