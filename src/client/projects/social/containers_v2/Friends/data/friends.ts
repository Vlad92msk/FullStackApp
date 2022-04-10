import { UserStatus } from '@client/projects/social/containers_v2/Friends/components/Friend/Friend'

export type Friend = {
  friendId: number
  friendImg: string
  friendName: string
  friendStatus: UserStatus
  friendMessageCount: number
}

export const FRIENDS: Friend[] = [
  {
    friendId: 1,
    friendName: 'name name',
    friendImg: 'ava',
    friendStatus: UserStatus.ONLINE,
    friendMessageCount: 2,
  },
  {
    friendId: 2,
    friendName: 'name2 name2',
    friendImg: 'ava',
    friendStatus: UserStatus.OFFLINE,
    friendMessageCount: null,
  },
]
