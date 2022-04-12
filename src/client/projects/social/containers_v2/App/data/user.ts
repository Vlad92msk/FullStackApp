import { UserStatus } from '@client/projects/social/containers_v2/UserMenu/components/Friend/Friend'

export const USER = {
  id: 1,
  description: 'dwedwedwedwed',
  img: 'ava',
  hashName: 'firsovv',
  name: 'Vlad',
  family: 'Firsov',
  status: UserStatus.ONLINE,
  friends: [3, 4, 7]
}


export type UserType = typeof USER
