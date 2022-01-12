import React, { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apolloSettings/apolloClient'
import { NextPage } from 'next'
import { storageGet, storageSet } from '@shared/utils'
import '~public/styles/base.scss'
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

export const ProjectLanguage = React.createContext({
  language: '',
  setLanguage: null
})


const MyApp = ({ Component, pageProps }: { Component: NextPage; pageProps: unknown }) => {
  const [language, setLanguage] = useState<string>()

  /**
   * Если страница обновляется или заходим впервые
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const languageStorage: string = storageGet('userLanguage')
      /**
       * Если в сторе есть указание языка - ставим его
       */
      if (languageStorage) {
        setLanguage(languageStorage)
      }
      /**
       * Если нет - по умолчанию Русский
       */
      else {
        setLanguage('ru')
      }
    }
  }, [])

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
        <Component {...pageProps} />
      </ApolloProvider>
    </ProjectLanguage.Provider>
  )
}

export default MyApp
