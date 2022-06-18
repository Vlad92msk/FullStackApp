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
  console.log('login', ctx.resolvedUrl)
  /**
   * ctx.resolvedUrl - текущий путь
   */
  return ({
    // redirect: {
    //   destination: `${ctx.resolvedUrl}/${ROUTES_ALL.SOCIAL_PROFILE}`,
    //   permanent: true
    // },
    props: {}
  })
}
export default Index

