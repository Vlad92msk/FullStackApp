import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

export interface PageType {
  title?: string
  subTitle?: string
}

export const Page: NextPage<PageType> = ({ title, subTitle, children }) => (
  <>
    <Head>
      <link type='image/png' rel='shortcut icon' href='/resources/images/htmlTag.png' />
      <title>
        {title} | {subTitle}
      </title>
      <meta property='og:title' content='My page title' key='title' />
    </Head>
    <div>{children}</div>
  </>
)

Page.defaultProps = {
  title: 'Vlad',
  subTitle: 'Portfolio'
}
