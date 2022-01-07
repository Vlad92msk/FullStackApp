import React from 'react'
import { NextPage } from 'next'
import { App } from '~client/projects/portfolio/containers/App'
import { addApolloState, initializeApollo } from '~client/apolloSettings/apolloClient'
import { FindAllSkillsDocument } from '~client/projects/gql-generated-hooks'

import { Page } from '@shared/components/page'
import { makeCn } from '@shared/utils'
import styles from '../../client/projects/portfolio/containers/App/App.module.scss'

const cn = makeCn('Application', styles)


const Home: NextPage = () => {
  return (
    <Page>
      <App />
    </Page>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo()
  const skills = await apolloClient.query({ query: FindAllSkillsDocument })

  addApolloState(apolloClient, {
    props: {
      skills
    }
  })

  return ({
    props: {
      skills
    }
  })

}

export default Home
