import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client/shared/utils'
import { AreaInput } from '@client/projects/social/components'
import { IconButton } from '@client/shared/components/IconButton'
import { Text } from '@client/shared/components/Text'
import { ChatMassage, MASSAGE_FROM } from './components/ChatMassage/ChatMassage'
import { MESSAGES } from '@client/projects/social/containers_v2/Chat/data/messages'
import { USER } from '@client/projects/social/containers_v2/App/data/user'
import { Friend } from '@client/projects/social/containers_v2/Friends/data/friends'
import styles from './Chat.module.scss'

const cn = makeCn('Chat', styles)

export type ChatType = {
  openedUserIdChat: number
  targetUser: Friend
  handleCloseChat: () => void
}
export const Chat: React.FC<ChatType> = React.memo((props) => {
  const { openedUserIdChat, handleCloseChat, targetUser } = props
  const user = USER
  const chatMassageContainer = useRef<HTMLDivElement>(null)

  /**
   * Локальные сообщения
   */
  const [messages, setMessages] = useState([])
  useEffect(() => {
    if (Boolean(targetUser)) {
      setMessages(MESSAGES.filter(({ fromUserId }) => fromUserId === targetUser.friendId))
    }
  }, [MESSAGES, targetUser])

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
                <Text className={cn('ContactUserName')} children={targetUser.friendName} />
                <Text size={'1'} className={cn('ContactOnline')}>online</Text>
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
                <AreaInput />
              </div>
            </div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
})
