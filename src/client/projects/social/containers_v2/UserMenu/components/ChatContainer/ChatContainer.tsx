import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { createId } from '@server/utils/createId'
import { makeCn } from '@client_shared/utils'
import { IconButton } from '@client_shared/components/IconButton'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { AreaInput } from '@client/projects/social/components'
import { ChatMassage, MASSAGE_FROM } from '../ChatMassage/ChatMassage'
import { Message, MESSAGES } from '../../data/messages'
import { USER, UserType } from '../../../App/data/user'
import styles from './ChatContainer.module.scss'

const cn = makeCn('ChatContainer', styles)

export type ChatType = {
  openedUserIdChat: number
  targetUser: UserType
  handleCloseChat: () => void
}
export const ChatContainer: React.FC<ChatType> = React.memo((props) => {
  const { openedUserIdChat, handleCloseChat, targetUser } = props
  const user = USER
  const chatMassageContainer = useRef<HTMLDivElement>(null)

  /**
   * Локальные сообщения
   */
  const [messages, setMessages] = useState<Message[]>([])
  useEffect(() => {
    if (Boolean(targetUser)) {
      setMessages(MESSAGES.filter(({ fromUserId }) => fromUserId === targetUser.id))
    }
  }, [MESSAGES, targetUser])

  /**
   * Текст сообщения
   */
  const [messageInput, setMessageInput] = useState<string>('')

  /**
   * Отправить сообщение
   * TODO: на бэке дополнить пустые свойства и сгеренровать ID
   */
  const onCreateMessage = useCallback(() => {
    setMessages(prev => [...prev, {
      fromUserId: user.id,
      toUserId: targetUser.id,
      dateSeen: null,
      dateCreate: new Date(),
      messageId: createId(50),
      smile: null,
      massage: messageInput
    }])
    setMessageInput('')
  }, [messageInput])

  /**
   * Автоскролл к последнему сообщению
   */
  useEffect(() => {
    if (openedUserIdChat) {
      chatMassageContainer?.current.scrollBy({
        top: chatMassageContainer.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [chatMassageContainer, openedUserIdChat])

  return (
    <AnimatePresence exitBeforeEnter>
      {
        openedUserIdChat && (
          <motion.div
            className={cn()}
            initial={{ left: '-50%' }}
            animate={{ left: '230%' }}
            exit={{ left: '-50%' }}
            transition={{ duration: 1 }}
          >
            <div className={cn('Header')}>
              <IconButton
                className={cn('Back')}
                icon={'arrow-left'}
                fill={'oldAsphalt50'}
                onClick={handleCloseChat}
              />
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
            <div className={cn('Footer')}>
              <div className={cn('FooterFileSmileRow')}>
                <IconButton size={'small'} fill={'oldAsphalt50'} icon={'file-outlined'} className={cn('FooterFile')} />
                <IconButton size={'small'} fill={'oldAsphalt50'} icon={'smile'} className={cn('FooterSmile')} />
              </div>
              <div className={cn('FooterInput')}>
                <AreaInput value={messageInput} onChange={setMessageInput} />
                <ButtonBox onClick={onCreateMessage} style={{ alignSelf: 'end' }} disabled={!messageInput?.length}>
                  <Text
                    className={cn('Submit', { active: Boolean(messageInput?.length) })}
                    size={'1'}
                    children={'Отправить'}
                  />
                </ButtonBox>
              </div>
            </div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
})