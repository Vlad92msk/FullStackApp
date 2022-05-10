import React, { useCallback, useEffect, useRef, useState } from 'react'

import { createId } from '@server/utils/createId'
import { makeCn } from '@client_shared/utils'
import { IconButton } from '@client_shared/components/IconButton'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { AreaInput } from '@client/shared/components/AreaInput'
import { InputSmiles } from '@client/shared/components/InputSmiles'
import { FileUpLoad } from '@client/shared/components/FileUpLoad'
import { ChatMassage, MASSAGE_FROM } from '../ChatMassage/ChatMassage'
import { Message, MESSAGES } from '../../data/messages'
import { USER, UserType } from '../../../App/data/user'
import styles from './ChatContainer.module.scss'

const cn = makeCn('ChatContainer', styles)

export type ChatType = {
  openedUserIdChat: number
  targetUser: UserType
}
export const ChatContainer: React.FC<ChatType> = React.memo((props) => {
  const { openedUserIdChat, targetUser } = props
  const user = USER
  const chatMassageContainer = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [newRecordFiles, setNewRecordFiles] = useState([])

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
  const [messageInput, setMessageInput1] = useState<string>('')
  const setMessageInput = useCallback(({ value }) => {
    setMessageInput1(value)
  }, [])
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
      massage: messageInput,
      attachments: newRecordFiles
    }])
    setMessageInput('')
    setNewRecordFiles([])
  }, [messageInput, newRecordFiles])

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
      <div className={cn('Footer')}>
        <div className={cn('FooterFileSmileRow')}>
          <FileUpLoad className={cn('FooterFile')} icon={'file-outlined'} onApply={setNewRecordFiles} />
          <InputSmiles className={cn('FooterSmile')} setText={setMessageInput} textAreaRef={textAreaRef} />
        </div>
        <div className={cn('FooterInput')}>
          <AreaInput
            anchorEl={textAreaRef}
            className={cn('FooterInputText')}
            value={messageInput}
            onChange={setMessageInput}
          />
          <div className={cn('FooterInputSubmitRow')}>
            {Boolean(newRecordFiles.length) && (
              <Text
                className={cn('AddedFilesCount')}
                size={'1'}
                children={`${newRecordFiles.length} файлов`}
              />
            )}
            <ButtonBox
              style={{ justifyContent: 'flex-end', width: '100%' }}
              onClick={onCreateMessage}
              disabled={!messageInput?.length}
            >
              <Text
                className={cn('Submit', { active: Boolean(messageInput?.length) })}
                size={'1'}
                children={'Отправить'}
              />
            </ButtonBox>
          </div>
        </div>
      </div>
    </div>
  )
})
