import { gql } from 'apollo-boost'
import { Skill } from '~server/lib/portfolio/skills/entitys/skills.entity'
import { User } from '~server/lib/connect/users/entitys/user.entity'
import { SignInInput } from '~server/lib/connect/auth/inputs/signIn.input'
import { TypedDocumentNode } from '@apollo/client'


export type AppQueriesType = {
  FIND_SKILLS: TypedDocumentNode<{findAllSkills: [Skill]}>
  LOG_IN?: TypedDocumentNode<{authSignIn: User}, SignInInput>
  LOG_OUT?: TypedDocumentNode<boolean, never>
}

export const appQueries: AppQueriesType = {
  FIND_SKILLS: gql`
    query {
      findAllSkills {
        name
        specialty
        position
        id
      }
    }
  `,
  LOG_IN: gql`
    query authSignIn($authSignInUser: SignInInput!) {
      authSignIn(signInInput: $authSignInUser) {
        email
        name
        uRoles
      }
    }
  `,
  LOG_OUT: gql`
    mutation authSignOut {
      authSignOut
    }
  `
}
