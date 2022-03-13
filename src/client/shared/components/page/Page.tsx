import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { AuthGuard, AuthGuardType } from '@client_shared/containers/AuthGuard'
import { languageVariants, ProjectLanguage } from '@client_pages/_app'
import { WithTransition } from '@client/shared/containers/MotionPage'

export interface PageType extends AuthGuardType {
  title?: string
  subTitle?: string
}


export const Page: NextPage<PageType> = React.memo(({ title, subTitle, children, roles, page }) => {
  const { language, setLanguage } = useContext(ProjectLanguage)
  const { query, push } = useRouter()
  const isQueryLangCorrect = Boolean(query.lang) && languageVariants.includes(String(query.lang))
  /**
   * Если язык не указан или
   * Если вместо языка указано чтото не то - принудительно меняем на дефолтный
   */
  useEffect(() => {
    if (!isQueryLangCorrect) {
      push({
        query: {
          lang: language
        }
      })
    }
  }, [query, language])

  /**
   * Если не 404 страница И
   * Если язык в сторе не равен тому, что в URL И
   * Если в URL корректный язык то
   * Изменить язык в сторе на тот, что в URL
   *
   * Это надо чтоб можно было менять язык сразу через Урл
   */
  useEffect(() => {
    if (
      page !== 'ERROR_404' &&
      language !== query.lang &&
      isQueryLangCorrect
    ) {
      setLanguage(query.lang)
    }
  }, [query, language, page])

  return (
    <AuthGuard page={page} roles={roles}>
      <WithTransition>
        <Head>
          <link type='image/png' rel='shortcut icon' href='/resources/images/htmlTag.png' />
          {(title || subTitle) && (
            <title>
              {`${title} | ${subTitle} [${language}]`}
            </title>
          )}
          <meta property='og:title' content='My page title' key='title' />
        </Head>
        {children}
      </WithTransition>
    </AuthGuard>
  )
})

Page.defaultProps = {
  title: 'Vlad',
  subTitle: 'Portfolio'
}
