import { DocumentNode } from '@apollo/client'
import { addApolloState, initializeApollo } from '~client/apolloSettings/apolloClient'


type ActionsType = {
  queries?: [{ query: DocumentNode; variables?: any }]
  mutation?: any[]
}

export const createActions = async (data: ActionsType) => {
  const apolloClient = initializeApollo()
  if (data.queries) {
    for (const { query, variables } of data.queries) {
      await apolloClient.query({ query, variables })
    }
  }
  if (data.mutation) {
    // for (const { query, variables } of data.querys) {
    //   await apolloClient.query({ query, variables })
    // }
  }

  return addApolloState(apolloClient, { props: {} })
}

