import { useMemo } from 'react'
import { ApolloClient, DataProxy, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // ssrMode: true,
    link: new HttpLink({
      uri: `http://localhost:3000/graphql`,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  })

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  // Если уже есть данные
  if (initialState) {
    // Получить существующий кеш, загруженный во время выборки данных на стороне клиента
    const existingCache = _apolloClient.extract()

    // Объединить существующий кеш с данными, переданными из getStaticProps / getServerSideProps
    const data = merge(initialState, existingCache, {
      // объединять массивы, используя равенство объектов (как в наборах)
      arrayMerge: (destinationArray, sourceArray) => [...sourceArray, ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s)))],
    })

    // Восстановить кеш с объединенными данными
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Для SSG и SSR всегда создавайте нового клиента Apollo.
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const addApolloState = (client: ApolloClient<NormalizedCacheObject>, pageProps?: any) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export const useApollo = (pageProps: unknown): ApolloClient<NormalizedCacheObject> => {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  return useMemo(() => initializeApollo(state), [state])
}
export type ApolloStateType = ReturnType<typeof useApollo>

/**
 * @description Получить данные из кэша
 * @param options
 */
export const getCache = (options: DataProxy.ReadQueryOptions<NormalizedCacheObject, unknown>): NormalizedCacheObject => {
  const apolloClient = initializeApollo()
  return apolloClient.cache.readQuery(options)
}