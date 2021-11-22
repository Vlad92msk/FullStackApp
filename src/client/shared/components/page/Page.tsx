import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { classnames } from '@bem-react/classnames'

export interface PageType {
  title?: string
  subTitle?: string
  className?: string
}

export const Page: NextPage<PageType> = ({ title, subTitle, className, children }) => (
  <>
    <Head>
      <link type='image/png' rel='shortcut icon' href='/resources/images/htmlTag.png' />
      {(title || subTitle) && (
        <title>
          {title} | {subTitle}
        </title>
      ) }
      <meta property='og:title' content='My page title' key='title' />
    </Head>
    <div className={classnames(className)}>{children}</div>
  </>
)

Page.defaultProps = {
  title: 'Vlad',
  subTitle: 'Portfolio'
}
