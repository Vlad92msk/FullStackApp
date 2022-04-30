import { UserStatus } from '@client/projects/social/components'
import { UserType } from '@client/projects/social/containers/App/data/user'

export const ALL_USERS: UserType[] = [
  {
    id: 2,
    name: 'name2',
    family: 'falily',
    img: 'ava',
    status: UserStatus.ONLINE,
    description: 'ddddddd',
    hashName: 'dwed',
    friends: []
  },
  {
    id: 3,
    name: 'name3',
    family: 'falily',
    img: 'ava',
    status: UserStatus.ONLINE,
    description: 'ddddddd',
    hashName: 'dwed',
    friends: [1]
  },
  {
    id: 4,
    name: 'name4',
    family: 'falily',
    img: 'ava',
    status: UserStatus.ONLINE,
    description: 'ddddddd',
    hashName: 'dwed',
    friends: [1, 2]
  },
  {
    id: 5,
    name: 'name5',
    family: 'falily',
    img: 'ava',
    status: UserStatus.ONLINE,
    description: 'ddddddd',
    hashName: 'dwed',
    friends: []
  },
  {
    id: 6,
    name: 'name6',
    family: 'falily',
    img: 'ava',
    status: UserStatus.ONLINE,
    description: 'ddddddd',
    hashName: 'dwed',
    friends: [2]
  },
  {
    id: 7,
    name: 'name7',
    family: 'falily',
    img: 'ava',
    status: UserStatus.ONLINE,
    description: 'ddddddd',
    hashName: 'dwed',
    friends: [1, 3, 6]
  },
]
