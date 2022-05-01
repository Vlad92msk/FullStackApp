import React, { useCallback, useEffect, useRef, useState } from 'react'

import { createId } from '@server/utils/createId'
import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { AreaInput } from '@client/shared/components/AreaInput'
import { Message } from '../../data/messages'
import styles from './CreateChatMessage.module.scss'
import { FileUpLoad } from '@client/shared/components/FileUpLoad'
import { InputSmiles } from '@client/shared/components/InputSmiles'

const cn = makeCn('CreateChatMessage', styles)

export type CreateChatMessageProps = {
  onSendMessage: React.Dispatch<React.SetStateAction<Message>>
  currentUserId: number
  targetUserId: number
}
export const CreateChatMessage: React.FC<CreateChatMessageProps> = React.memo((props) => {
  const { onSendMessage, currentUserId, targetUserId } = props
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [newRecordFiles, setNewRecordFiles] = useState([])
  const [messageInput, setMessageInput] = useState<string>('')

  /**
   * Отправить сообщение
   * TODO: на бэке дополнить пустые свойства и сгеренровать ID
   */
  const onCreateMessage = useCallback(() => {
    onSendMessage({
      fromUserId: currentUserId,
      toUserId: targetUserId,
      dateSeen: null,
      dateCreate: new Date(),
      messageId: createId(50),
      smile: null,
      massage: messageInput,
      attachments: newRecordFiles
    })
    setMessageInput('')
    setNewRecordFiles([])
  }, [messageInput, newRecordFiles, currentUserId, targetUserId])

  return (
    <div className={cn()}>
      <div className={cn('FileSmileRow')}>
        <FileUpLoad className={cn('File')} icon={'file-outlined'} onApply={setNewRecordFiles} />
        <InputSmiles className={cn('Smile')} setText={setMessageInput} textAreaRef={textAreaRef} />
      </div>
      <AreaInput
        anchorEl={textAreaRef}
        className={cn('InputText')}
        value={messageInput}
        onChange={setMessageInput}
      />
      <div className={cn('InputSubmitRow')}>
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
  )
})
