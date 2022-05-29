import { UserType } from '@client/projects/social/containers/App/data/user'

export type UseUserMenuState = {
  friends?: UserType[]
  possibleFriends?: UserType[]
  currenUser?: UserType
  notification?: any
  hashes?: any
}

export const initial: UseUserMenuState = {
  friends: [],
  possibleFriends: [],
  currenUser: {},
  notification: null,
  hashes: null
}
