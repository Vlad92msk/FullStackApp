import React from 'react'
import { NextPage } from 'next'
import { App } from '~client/modules/core/containers/App'
import { addApolloState, initializeApollo } from '~client/apolloSettings/apolloClient'
import { appQueries } from '~client/modules/core/graphql/appQueries'


const Home: NextPage = () => {
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
