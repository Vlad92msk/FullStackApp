import React from 'react'
import { NextPage } from 'next'
import { App } from '~client/modules/core/containers/App'
import { addApolloState, getCache, initializeApollo } from '~client/apolloSettings/apolloClient'
import { appQueries } from '~client/modules/core/graphql/queries'

type DD = {
  skills
}

const Home: NextPage<DD> = (props) => {
  const { skills } = props
  const a = getCache({ query: appQueries.LOG_IN })
  if (typeof window === 'undefined') return <div>Loading</div>
  return <App />
}

export async function getServerSideProps(ctx) {

  const apolloClient = initializeApollo()
  const skills = await apolloClient.query({ query: appQueries.FIND_SKILLS })

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
