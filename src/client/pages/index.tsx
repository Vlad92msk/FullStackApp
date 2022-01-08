import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { App } from '~client/projects/portfolio/containers/App'
import { addApolloState, initializeApollo } from '~client/apolloSettings/apolloClient'
import { FindAllSkillsDocument, FindAllSkillsQuery } from '~client/projects/gql-generated-hooks'

import { Page } from '@shared/components/page'
import { makeCn } from '@shared/utils'
import styles from '../../client/projects/portfolio/containers/App/App.module.scss'

const cn = makeCn('Application', styles)


const Home: NextPage = () => {
  return (
    <Page page={'PORTFOLIO'}>
      <App />
    </Page>
  )
}

export async function getServerSideProps(ctx: GetServerSideProps) {
  const apolloClient = initializeApollo()
  const { data: { findAllSkills } } = await apolloClient.query<FindAllSkillsQuery>({ query: FindAllSkillsDocument })

  return addApolloState(apolloClient, {
    props: {
      findAllSkills
    }
  })
}

export default Home
