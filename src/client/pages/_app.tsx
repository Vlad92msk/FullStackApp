import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

import { Loader } from '@client_shared/components/Loader'
import { storageGet, storageSet } from '@client_shared/utils'
import { useApollo } from '../apolloSettings/apolloClient'

import '@client_public/styles/base.scss'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/scrollbar/scrollbar.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/effect-cube/effect-cube.min.css'

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

export const languageVariants = ['ru', 'en']
export const DEFAULT_LANGUAGE = 'ru'

export const isValidLanguage = (lang: any) => languageVariants.includes(String(lang))

export const ProjectLanguage = React.createContext({
  language: '',
  setLanguage: null
})


const MyApp = ({ Component, pageProps }: { Component: NextPage; pageProps: unknown }) => {
  const [language, setLanguage] = useState<string>(() => storageGet('userLanguage') || DEFAULT_LANGUAGE)
  const [loading, setLoading] = useState<boolean>(false)
  const { events } = useRouter()


  useEffect(() => {
    const loadingOn = () => setLoading(true)
    const loadingOff = () => setLoading(false)

    events.on('routeChangeStart', loadingOn)
    events.on('routeChangeComplete', loadingOff)
    events.on('routeChangeError', loadingOff)


    return () => {
      events.off('routeChangeStart', loadingOn)
      events.off('routeChangeComplete', loadingOff)
      events.off('routeChangeError', loadingOff)
    }
  }, [events])

  /**
   * Меняем язык в меню - меняем и в сторе
   */
  useEffect(() => {
    storageSet('userLanguage', language)
  }, [language])

  const apolloClient = useApollo(language, pageProps)

  return (
    <ProjectLanguage.Provider value={{ language, setLanguage }}>
      <ApolloProvider client={apolloClient}>

          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>

      </ApolloProvider>
    </ProjectLanguage.Provider>
  )
}

export default MyApp
