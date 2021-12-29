import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { AuthGuard, AuthGuardType } from '@shared/containers/AuthGuard'

export interface PageType extends AuthGuardType {
  title?: string
  subTitle?: string
  className?: string
}

export const Page: NextPage<PageType> = (props) => {
  const {
    title, subTitle, className, children, roles, defaultErrorComponent, page
  } = props

  return (
    <AuthGuard page={page} defaultErrorComponent={defaultErrorComponent} roles={roles}>
      <Head>
        <link type='image/png' rel='shortcut icon' href='/resources/images/htmlTag.png' />
        {(title || subTitle) && (
          <title>
            {title} | {subTitle}
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
