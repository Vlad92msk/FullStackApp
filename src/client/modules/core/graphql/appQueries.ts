import { gql } from 'apollo-boost'
import { TypedDocumentNode} from '@apollo/client'
import { Skill } from '~server/lib/portfolio/skills/entitys/skills.entity'
import { User } from '~server/lib/connect/users/entitys/user.entity'
import { SignInInput } from '~server/lib/connect/auth/inputs/signIn.input'
import { CreateUsersInput } from '~server/lib/connect/users/inputs/create-user.input'


export type AppQueriesType = {
  FIND_SKILLS: TypedDocumentNode<{findAllSkills: [Skill]}>
  LOG_IN: TypedDocumentNode<{authSignIn: User}, { authSignInUser: SignInInput }>
  LOG_OUT: TypedDocumentNode<boolean, never>
  SIGN_UP: TypedDocumentNode<{authSignUp: User}, {authSignUpUser: CreateUsersInput}>
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
  `,
  SIGN_UP: gql`
    mutation authSignUp ($authSignUpUser: CreateUsersInput!){
      authSignUp(user: $authSignUpUser) {
        email
      }
    }
  `
}

