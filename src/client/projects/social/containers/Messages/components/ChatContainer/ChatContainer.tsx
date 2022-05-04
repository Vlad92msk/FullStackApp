import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { IconButton } from '@client_shared/components/IconButton'
import { Text } from '@client_shared/components/Text'
import { scrollToCurrent } from '@client_shared/utils/scrollToParent'

import { ChatMassage, MASSAGE_FROM, CreateChatMessage } from '../'
import { Message } from '../../data/messages'
import { useUserMenuStateValue } from '@client/projects/social/containers/UserMenu/useUserMenuState'
import { useMessageStateValue } from '@client/projects/social/containers/Messages/useMessageState'
import { UserType } from '@client/projects/social/containers/App/data/user'
import styles from './ChatContainer.module.scss'

const cn = makeCn('ChatContainer', styles)

export type ChatType = {}
export const ChatContainer: React.FC<ChatType> = React.memo((props) => {
  const currenUser = useUserMenuStateValue<UserType>('currenUser')

  const openUserIcChat = useMessageStateValue<number>('openUserIcChat')
  const currentUsersChats = useMessageStateValue<UserType[]>('currentUsersChats')
  const messageFromFriends = useMessageStateValue<Message[]>('messageFromFriends')
  const messageNotFromFriends = useMessageStateValue<Message[]>('messageNotFromFriends')

  if (!openUserIcChat) return <></>

  const chatMassageContainer = useRef<HTMLDivElement>(null)


  /**
   * Локальные сообщения
   */
  const [messages, setMessages] = useState<Message[]>([])
  useEffect(() => {
    setTimeout(() => scrollToCurrent(chatMassageContainer), 200)
    setMessages([...messageFromFriends, ...messageNotFromFriends].filter(({ fromUserId }) => fromUserId === openUserIcChat))
  }, [openUserIcChat, chatMassageContainer, messageFromFriends, messageNotFromFriends])

  const targetUser = useMemo(() => currentUsersChats.find(({ id }) => id === openUserIcChat), [openUserIcChat])


  /**
   * Отправить сообщение
   * TODO: на бэке дополнить пустые свойства и сгеренровать ID
   */
  const onCreateMessage = useCallback((newMessage: Message) => {
    setMessages(prev => [...prev, newMessage])
    setTimeout(() => scrollToCurrent(chatMassageContainer), 200)
  }, [chatMassageContainer])

  return (
    <div className={cn()}>
      <div className={cn('Header')}>
        <div className={cn('Contact')}>
          <Text className={cn('ContactUserName')} children={`${targetUser?.name} ${targetUser?.family}`} />
          <Text size={'1'} className={cn('ContactOnline')} children={targetUser?.status} />
        </div>
        <IconButton icon={'headphones'} fill={'oldAsphalt50'} className={cn('Call')} />
      </div>
      <div ref={chatMassageContainer} className={cn('MainContainer')}>
        {messages.map((message) => (
          <ChatMassage
            key={message.messageId}
            isWasSeen={Boolean(message.dateSeen)}
            from={currenUser?.id === message.fromUserId ? MASSAGE_FROM.ME : MASSAGE_FROM.OTHER}
            message={message}
          />
        ))}
      </div>
      <CreateChatMessage onSendMessage={onCreateMessage} currentUserId={currenUser?.id} targetUserId={targetUser?.id} />
    </div>
  )
})
