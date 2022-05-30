import React, { useEffect, useMemo } from 'react'
import lodash from 'lodash'

import { makeCn } from '@client_shared/utils'
import { Modal } from '@client_shared/components/Modal'
import { useBooleanState } from '@client_shared/hooks'
import { AreaInput } from '@client_shared/components/AreaInput'

import { ChatFolders, ChatContainer, UsersChats, OpenChatButton } from './components'
import { MESSAGES } from './data/messages'
import { FOLDERS_CHATS } from './data/foldersChats'
import { messageActions, useServiceMessageAction, useServiceMessageSelector } from './service'
import { USER } from '@client/projects/social/containers/App/data/user'
import styles from './Messages.module.scss'

const cn = makeCn('Messages', styles)


export const Messages: React.FC = React.memo(() => {
  const newMessages = useServiceMessageSelector('newMessages')
  const searchInput = useServiceMessageSelector('search')
  const dispatch = useServiceMessageAction()
  const [isOpen, handleOpen, handleClose] = useBooleanState(false)
  /**
   * КОл-во новых сообщений
   */
  const newMessagesSize = useMemo(() => (
    lodash(newMessages)
    .reduce((acc, item) => acc + lodash.size(item), 0)
  ), [newMessages])

  useEffect(() => {
    setTimeout(() => dispatch(messageActions.INJECT__MESSAGE_API({
      allMessages: MESSAGES,
    })), 200)
  }, [MESSAGES])

  useEffect(() => {
    if (USER?.friends.length) {
      setTimeout(() => dispatch(messageActions.INJECT__FOLDERS_API({
        folders: FOLDERS_CHATS,
      })), 200)
    }
  }, [FOLDERS_CHATS])

  return (
    <>
      <OpenChatButton onOpen={handleOpen} messageCount={newMessagesSize} />
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
            onIconClear={() => dispatch(messageActions.SEARCH__CHAT({ value: '' }))}
            onChange={({ value }) => dispatch(messageActions.SEARCH__CHAT({ value }))}
            value={searchInput}
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
