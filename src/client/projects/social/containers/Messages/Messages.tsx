import React, { useCallback, useEffect } from 'react'

import { makeCn } from '@client_shared/utils'
import { Modal } from '@client_shared/components/Modal'
import { useBooleanState } from '@client_shared/hooks'
import { AreaInput } from '@client_shared/components/AreaInput'

import { MESSAGES } from './data/messages'
import { FOLDERS_CHATS } from './data/foldersChats'
import { ChatFolders, ChatContainer, UsersChats, OpenChatButton } from './components'
import {
  message$,
  useMessageStateValue,
  useUseMessageStateChange
} from '@client/projects/social/containers/Messages/useMessageState'
import { USER_ID } from '@client/projects/social/containers/NavBar'
import styles from './Messages.module.scss'

const cn = makeCn('Messages', styles)


export const Messages: React.FC = React.memo(() => {
  const setMessageState = useUseMessageStateChange(message$)
  const search = useMessageStateValue<string>('search')

  const [isOpen, handleOpen, handleClose] = useBooleanState(false)

  useEffect(() => {
    setMessageState({
      folders: FOLDERS_CHATS.filter(({ ownerId }) => ownerId === USER_ID),
      allMessages: MESSAGES.filter(({ toUserId }) => toUserId === USER_ID),
      newMessages: MESSAGES.filter(({ toUserId }) => toUserId === USER_ID).filter(({ dateSeen }) => !Boolean(dateSeen))
    })
  }, [USER_ID])

  const changeValueSearch = useCallback((newVal: string) => {
    setMessageState({ search: newVal })
  }, [])


  return (
    <>
      <OpenChatButton onOpen={handleOpen} messageCount={12} />
      <Modal className={cn()} backgroundImg={'bkg'} open={isOpen} onClose={handleClose}>
        <div className={cn('LeftMenu')}>
          <ChatFolders />
        </div>
        <div className={cn('PrevChats')}>
          <AreaInput
            as={'input'}
            inputClassName={cn('SearchInput')}
            icon={{
              size: 'ordinary',
              icon: 'search',
              fill: 'oldAsphalt40'
            }}
            iconClear={{
              icon: 'close',
              size: 'ordinary',
              fill: 'oldAsphalt40'
            }}
            onIconClear={() => setMessageState({ search: '' })}
            onChange={changeValueSearch}
            value={search}
          />
          <UsersChats />
        </div>
        <div className={cn('CurrentChat')}>
          <ChatContainer />
        </div>
      </Modal>
    </>
  )
})
