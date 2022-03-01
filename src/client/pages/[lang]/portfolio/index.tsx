import React from 'react'
import { NextPage, GetServerSideProps } from 'next'

import { App } from '@client_projects/portfolio/containers/App'
import { FindAllSkillsDocument, FindAllSkillsQuery } from '@client_projects/gql-generated-hooks'
import { Page } from '@client_shared/components/page'
import { getSSR, ssrResult } from '@client_shared/utils/getSsrFuncs'


const Home: NextPage = () => {
  return (
    <Page page={'PORTFOLIO'}>
      <App />
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = (ctx) => getSSR(ctx, async (apolloClient) => {
  const skills = await apolloClient.query<FindAllSkillsQuery>({ query: FindAllSkillsDocument })

  return ssrResult(apolloClient, { skills })
})


export default Home
