import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { IconButton } from '@client_shared/components/IconButton'
import { Text } from '@client_shared/components/Text'
import { scrollToCurrent } from '@client_shared/utils/scrollToParent'

import { ChatMassage, MASSAGE_FROM, CreateChatMessage } from '../'
import { Message } from '../../data/messages'
import { useUserMenuStateValue } from '@client/projects/social/containers/UserMenu/useUserMenuState'
import {
  useMessageServiceActions,
  useMessageServiceStore,
} from '@client/projects/social/containers/Messages/messageServiceState'
import { UserType } from '@client/projects/social/containers/App/data/user'
import styles from './ChatContainer.module.scss'
import { ALL_USERS } from '@client/projects/social/containers/UserMenu/data/all_users'

const cn = makeCn('ChatContainer', styles)

export type ChatType = {}
export const ChatContainer: React.FC<ChatType> = React.memo((props) => {
  const currenUser = useUserMenuStateValue<UserType>('currenUser')
  const openUserIdChat = useMessageServiceStore('openUserIdChat')
  const allMessages = useMessageServiceStore('allMessages')
  const sendNewMessage = useMessageServiceActions('sendNewMessage')
  if (!openUserIdChat) return <></>

  const chatMassageContainer = useRef<HTMLDivElement>(null)

  /**
   * Локальные сообщения
   */
  useEffect(() => {
    setTimeout(() => scrollToCurrent(chatMassageContainer), 200)
  }, [openUserIdChat, chatMassageContainer])

  const targetUser = useMemo(
    () => ALL_USERS.find(({ id }) => id === openUserIdChat),
    [openUserIdChat])


  /**
   * Отправить сообщение
   * TODO: на бэке дополнить пустые свойства и сгеренровать ID
   */
  const onCreateMessage = useCallback((newMessage: Message) => {
    console.log('newMessage', newMessage)
    sendNewMessage({message: newMessage, prev: allMessages, userId: 1})
    setTimeout(() => scrollToCurrent(chatMassageContainer), 200)
  }, [chatMassageContainer, allMessages])

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
        {(allMessages[openUserIdChat] || []).map((message) => (
          <ChatMassage
            key={message.messageId}
            isWasSeen={Boolean(message.dateSeen)}
            from={currenUser?.id === message.fromUserId ? MASSAGE_FROM.ME : MASSAGE_FROM.OTHER}
            message={message}
          />
        ))}
      </div>
      <CreateChatMessage onSendMessage={onCreateMessage} currentUserId={1} targetUserId={targetUser?.id} />
    </div>
  )
})
