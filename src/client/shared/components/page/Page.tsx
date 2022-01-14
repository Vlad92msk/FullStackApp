import React, { useContext } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { AuthGuard, AuthGuardType } from '@shared/containers/AuthGuard'
import { ProjectLanguage } from '~client/pages/_app'

export interface PageType extends AuthGuardType {
  title?: string
  subTitle?: string
}

export const Page: NextPage<PageType> = (props) => {
  const {
    title, subTitle, children, roles, page
  } = props
  const { language } = useContext(ProjectLanguage)

  return (
    <AuthGuard page={page} roles={roles}>
      <Head>
        <link type='image/png' rel='shortcut icon' href='/resources/images/htmlTag.png' />
        {(title || subTitle) && (
          <title>
            {title} | {subTitle}[{language}]
          </title>
        )}
        <meta property='og:title' content='My page title' key='title' />
      </Head>
      {children}
    </AuthGuard>
  )
}

Page.defaultProps = {
  title: 'Vlad',
  subTitle: 'Portfolio'
}
