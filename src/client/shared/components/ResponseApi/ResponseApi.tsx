import React from 'react'
import { ApolloError } from '@apollo/client'

interface ResponseApiType {
  status: boolean[]
  errors: ApolloError[]
}

export const ResponseApi: React.FC<ResponseApiType> = ({ status, errors, children }) => {
  const isLoad = Array.from(new Set(status)).every((i) => i === false)
  const findFirstError = errors.find((err) => !!err)

  if (!isLoad) return <div>Loading...</div>
  if (!findFirstError) return <>{children}</>

  return (<div>
    <div>NetworkError-name: {findFirstError.networkError.name}</div>
    <div>NetworkError-message: {findFirstError.networkError.message}</div>
    <div>ExtraInfo: {findFirstError.extraInfo}</div>
    <div>Message: {findFirstError.message}</div>
    <div>GraphQLErrors-message: {findFirstError.graphQLErrors.map(({ message }) => message)}</div>
  </div>)
}
