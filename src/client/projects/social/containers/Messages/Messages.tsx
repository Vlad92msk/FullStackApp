import React, { useCallback, useEffect, useMemo } from 'react'

import { makeCn } from '@client_shared/utils'
import { Modal } from '@client_shared/components/Modal'
import { useBooleanState } from '@client_shared/hooks'
import { AreaInput } from '@client_shared/components/AreaInput'
import { MESSAGES } from './data/messages'
import { FOLDERS_CHATS } from './data/foldersChats'
import { ChatFolders, ChatContainer, UsersChats, OpenChatButton } from './components'
import {
  useMessageServiceActions, useMessageServiceStore
} from '@client/projects/social/containers/Messages/messageServiceState'
import { USER_ID } from '@client/projects/social/containers/NavBar'
import styles from './Messages.module.scss'
import { useUserMenuState } from '@client/projects/social/containers/UserMenu/useUserMenuState'

const cn = makeCn('Messages', styles)


export const Messages: React.FC = React.memo(() => {
  const searchInput = useMessageServiceStore('search')

  const setSearch = useMessageServiceActions('searchInput')
  const setMessage = useMessageServiceActions('allMessagesApi')
  const setFolders = useMessageServiceActions('foldersApi')

  const [isOpen, handleOpen, handleClose] = useBooleanState(false)
  const { friends, currenUser } = useUserMenuState()

  useEffect(() => {
    setTimeout(() => {
      setMessage({ allMessages: MESSAGES, userId: USER_ID })
    }, 200)
  }, [])

  useEffect(() => {
    if (currenUser?.friends.length) {
      setFolders({ folders: FOLDERS_CHATS, userId: USER_ID, friends: currenUser?.friends })
    }
  }, [currenUser])

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
            onIconClear={() => setSearch({ value: '' })}
            onChange={setSearch}
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
