import { MassageSmileReaction } from '@client/projects/social/containers_v2/Chat/components'

export type Message = {
  messageId: string
  fromUserId: number
  toUserId: number
  massage: string
  smile: MassageSmileReaction
  dateCreate: Date
  dateSeen: Date
}

export const MESSAGES: Message[] = [
  {
    messageId: 'dwed-dwed-wed-d-ddwed',
    dateCreate: new Date(),
    dateSeen: null,
    fromUserId: 2,
    toUserId: 1,
    massage: 'text',
    smile: null
  },
  {
    messageId: 'djtyj-ytj-jjjjyu-jhger-jtdv',
    dateCreate: new Date(),
    dateSeen: null,
    fromUserId: 2,
    toUserId: 1,
    massage: 'text',
    smile: null
  },
  {
    messageId: 'djtyj-ytj-jjjjyu-jhger-jtdv',
    dateCreate: new Date(),
    dateSeen: null,
    fromUserId: 1,
    toUserId: 2,
    massage: 'text',
    smile: null
  }
]
