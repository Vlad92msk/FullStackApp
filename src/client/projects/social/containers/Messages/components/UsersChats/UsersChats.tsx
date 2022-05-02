import React from 'react'
import { Friend } from '@client/projects/social/containers/Messages/components'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { UserType } from '../../../App/data/user'
import { Message } from '../../data/messages'
import styles from './UsersChats.module.scss'

const cn = makeCn('UsersChats', styles)

type UsersChatsProps = {
  friends: UserType[]
  anyUsers: UserType[]
  messagesFromFriends: Message[]
  messagesNotFromFriends: Message[]
  onChatOpen: (userId: number) => void
  openedUserIdChat: number
}
export const UsersChats: React.FC<UsersChatsProps> = React.memo((props) => {
  const { anyUsers, friends, messagesFromFriends, messagesNotFromFriends, onChatOpen, openedUserIdChat } = props

  return (
    <div className={cn()}>
      {Boolean(friends.length) && (
        <>
          <Text className={cn('Title')} children={'Чаты с друзьями'} size={'1'} />
          {friends.map((friend) => (
            <Friend
              key={friend.id}
              friend={friend}
              isActive={friend.id === openedUserIdChat}
              onOpenChat={onChatOpen}
              friendMessageCount={
                messagesFromFriends.filter(({ dateSeen }) => !Boolean(dateSeen)).length
              }
            />
          ))}
        </>
      )}
      {Boolean(anyUsers.length) && (
        <>
          <Text className={cn('Title')} children={'Чаты не с друзьями'} size={'1'} />
          {anyUsers.map((friend) => (
            <Friend
              key={friend.id}
              friend={friend}
              onOpenChat={onChatOpen}
              isActive={friend.id === openedUserIdChat}
              friendMessageCount={
                messagesNotFromFriends.filter(({ dateSeen }) => !Boolean(dateSeen)).length
              }
            />
          ))}
        </>
      )}
    </div>
  )
})
