import React, { useCallback, useEffect, useRef, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { IconButton } from '@client_shared/components/IconButton'
import { Text } from '@client_shared/components/Text'
import { scrollToCurrent } from '@client_shared/utils/scrollToParent'

import { ChatMassage, MASSAGE_FROM, CreateChatMessage } from '../'
import { Message, MESSAGES } from '../../data/messages'
import { UserType } from '../../../App/data/user'
import styles from './ChatContainer.module.scss'

const cn = makeCn('ChatContainer', styles)

export type ChatType = {
  targetUser: UserType
  user: UserType
}
export const ChatContainer: React.FC<ChatType> = React.memo((props) => {
  const { targetUser, user } = props
  const chatMassageContainer = useRef<HTMLDivElement>(null)

  /**
   * Локальные сообщения
   */
  const [messages, setMessages] = useState<Message[]>([])
  useEffect(() => {
    if (Boolean(targetUser)) {
      setTimeout(() => scrollToCurrent(chatMassageContainer), 200)
      setMessages(MESSAGES.filter(({ fromUserId }) => fromUserId === targetUser.id))
    }
  }, [MESSAGES, targetUser, chatMassageContainer])


  /**
   * Отправить сообщение
   * TODO: на бэке дополнить пустые свойства и сгеренровать ID
   */
  const onCreateMessage = useCallback((newMessage:Message) => {
    setMessages(prev => [...prev, newMessage])
    setTimeout(() => scrollToCurrent(chatMassageContainer), 200)
  }, [chatMassageContainer])

  return (
    <div className={cn()}>
      <div className={cn('Header')}>
        <div className={cn('Contact')}>
          <Text className={cn('ContactUserName')} children={`${targetUser.name} ${targetUser.family}`} />
          <Text size={'1'} className={cn('ContactOnline')} children={targetUser.status} />
        </div>
        <IconButton icon={'headphones'} fill={'oldAsphalt50'} className={cn('Call')} />
      </div>
      <div ref={chatMassageContainer} className={cn('MainContainer')}>
        {messages.map((message) => (
          <ChatMassage
            key={message.messageId}
            isWasSeen={Boolean(message.dateSeen)}
            from={user.id === message.fromUserId ? MASSAGE_FROM.ME : MASSAGE_FROM.OTHER}
            message={message}
          />
        ))}
      </div>
      <CreateChatMessage onSendMessage={onCreateMessage} currentUserId={user.id} targetUserId={targetUser.id}/>
    </div>
  )
})
