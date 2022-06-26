import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Page } from '@client/shared/components/page'
import { Login } from '@client/projects/social/containers/Login'

const Index: NextPage = () => {
  return (
    <Page
      page={'LOGIN'}
      title={'VladSocial'}
      subTitle={'Login'}
    >
      <Login />
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /**
   * ctx.resolvedUrl - текущий путь
   */
  return ({
    props: {}
  })
}
export default Index

