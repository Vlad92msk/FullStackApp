import { gql } from 'apollo-boost'

export const LOGIN_USER = gql`
  mutation Login($user: CreateUsersInput!) {
    authSignUp(user: $user) {
      email
      name
      password
    }
  }
`
