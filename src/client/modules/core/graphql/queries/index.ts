import { gql } from 'apollo-boost'

export const appQueries = {
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
}
