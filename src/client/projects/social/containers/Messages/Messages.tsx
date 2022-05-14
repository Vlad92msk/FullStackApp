import React, { useEffect } from 'react'

import { makeCn } from '@client_shared/utils'
import { Modal } from '@client_shared/components/Modal'
import { useBooleanState } from '@client_shared/hooks'
import { AreaInput } from '@client_shared/components/AreaInput'

import { ChatFolders, ChatContainer, UsersChats, OpenChatButton } from './components'
import { useUserMenuState } from '../UserMenu/useUserMenuState'
import { useMessageServiceAction } from './service/MessageService'
import { allMessagesApi, foldersApi, searchUsersInFolders } from './service'
import { MESSAGES } from './data/messages'
import { FOLDERS_CHATS } from './data/foldersChats'
import { USER_ID } from '../NavBar'
import styles from './Messages.module.scss'

const cn = makeCn('Messages', styles)


export const Messages: React.FC = React.memo(() => {

  const [searchInput, setSearch] = useMessageServiceAction<'search'>(searchUsersInFolders)
  const [folders, setFolders] = useMessageServiceAction<'folders'>(foldersApi)
  const [allMessages, setMessage] = useMessageServiceAction<'allMessages'>(allMessagesApi)

  const [isOpen, handleOpen, handleClose] = useBooleanState(false)
  const { friends, currenUser } = useUserMenuState()

  useEffect(() => {
    setMessage({ allMessages: MESSAGES, userId: USER_ID })
  }, [MESSAGES, USER_ID])

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
            value={searchInput.search}
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
