import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { AuthGuard, AuthGuardType } from '@shared/containers/AuthGuard'
import { ERROR_404_Pages, ROUTES_ALL, routesAll } from '~client/projects/routesAll'

export interface PageType extends AuthGuardType {
  title?: string
  subTitle?: string
}

export const Page: NextPage<PageType> = (props) => {
  const {
    title, subTitle, children, roles, defaultErrorComponent, page
  } = props

  const pageName = page && ROUTES_ALL[page]
  const routesRoles = (pageName && pageName !== ERROR_404_Pages.ERROR_404) && routesAll[pageName].allowRoles

  return (
    <AuthGuard page={page} defaultErrorComponent={defaultErrorComponent} roles={routesRoles || roles}>
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
