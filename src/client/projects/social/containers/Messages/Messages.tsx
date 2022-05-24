import React, { useEffect, useMemo } from 'react'
import lodash from 'lodash'

import { makeCn } from '@client_shared/utils'
import { Modal } from '@client_shared/components/Modal'
import { useBooleanState } from '@client_shared/hooks'
import { AreaInput } from '@client_shared/components/AreaInput'

import { ChatFolders, ChatContainer, UsersChats, OpenChatButton } from './components'
import { useUserMenuState } from '../UserMenu/useUserMenuState'
import { MESSAGES } from './data/messages'
import { FOLDERS_CHATS } from './data/foldersChats'
import { USER_ID } from '../NavBar'
import { messageActions, useMessageServiceAction, useMessageServiceValue } from './service'
import styles from './Messages.module.scss'

const cn = makeCn('Messages', styles)


export const Messages: React.FC = React.memo(() => {
  const newMessages = useMessageServiceValue('newMessages')
  const searchInput = useMessageServiceValue('search')
  const setSearch = useMessageServiceAction()
  const setFolders = useMessageServiceAction()
  const setMessage = useMessageServiceAction()
  const [isOpen, handleOpen, handleClose] = useBooleanState(false)
  const { friends, currenUser } = useUserMenuState()
  /**
   * КОл-во новых сообщений
   */
  const newMessagesSize = useMemo(() => (
    lodash(newMessages)
    .reduce((acc, item) => acc + lodash.size(item), 0)
  ), [newMessages])

  useEffect(() => {
    setTimeout(() => setMessage(messageActions.INJECT__MESSAGE_API({
      allMessages: MESSAGES,
      userId: USER_ID
    })), 200)
  }, [MESSAGES, USER_ID])

  useEffect(() => {
    if (currenUser?.friends.length) {
      setFolders(messageActions.INJECT__FOLDERS_API({
        folders: FOLDERS_CHATS,
        userId: USER_ID,
        friends: currenUser?.friends
      }))
    }
  }, [currenUser])

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
            onIconClear={() => setSearch(messageActions.SEARCH__CHAT({ value: '' }))}
            onChange={({ value }) => setSearch(messageActions.SEARCH__CHAT({ value }))}
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
