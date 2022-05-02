import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Modal } from '@client_shared/components/Modal'
import { useBooleanState } from '@client_shared/hooks'
import { AreaInput } from '@client_shared/components/AreaInput'

import { USER } from '../App/data/user'
import { MESSAGES } from './data/messages'
import { ALL_USERS } from '../UserMenu/data/all_users'
import { FOLDERS_CHATS } from './data/foldersChats'
import { ChatFolders, ChatContainer, UsersChats, OpenChatButton } from './components'
import styles from './Messages.module.scss'

const cn = makeCn('Messages', styles)


export const Messages: React.FC = React.memo(() => {
  const {
    id,
    friends: userFriends
  } = USER

  const [folders, setFolders] = useState(FOLDERS_CHATS)


  const [isOpen, handleOpen, handleClose] = useBooleanState(false)
  const [comment, setComment] = useState<string>('')

  /**
   * Только друзья
   */
  const friends = ALL_USERS.filter(({ id }) => userFriends.includes(id))

  /**
   * Возможеные друзья
   */
  const possibleFriendsIds = Array.from(
    new Set(friends.reduce((acc, item) => [...acc, ...item.friends], []))
  ).filter((id: number) => !userFriends.includes(id))
  const possibleFriends = possibleFriendsIds.map((possibleUserId) => ALL_USERS.find(({ id }) => id === possibleUserId)).filter(Boolean)

  /**
   * Все сообщения мне
   */
  const messages = MESSAGES
  .filter(({ toUserId }) => toUserId === id)
  .filter(({ dateSeen }) => !Boolean(dateSeen))

  /**
   * Сообщения не от друзей
   */
  const messagesNotFromFriends = messages.filter(({ fromUserId }) => !userFriends.includes(fromUserId))
  /**
   * Сообщения от друзей
   */
  const messagesFromFriends = messages.filter(({ fromUserId }) => userFriends.includes(fromUserId))

  /**
   * Пользователи, которые прислали мне сообщения НО не находятся в друзьях
   */
  const a = messagesNotFromFriends.map(({ fromUserId }) => fromUserId)
  const usersNotFriends = ALL_USERS.filter(({ id }) => a.includes(id))

  /**
   * ID пользователя, чат с которым открыт
   */
  const [openedUserIdChat, setOpenedUserIdChat] = useState<number>(2)
  const [openFolderId, setOpenFolderId] = useState<number>(null)
  const handleOpenFolderId = useCallback((id: number) => {
    setOpenFolderId(id)
  }, [])

  const [openUsersChats, setOpenUsersChats] = useState<number[]>(null)
  useEffect(() => {
    if (openFolderId) {
      setOpenUsersChats(folders?.find(({ id }) => id === openFolderId)?.users)
    } else {
      setOpenUsersChats(null)
    }
  }, [openFolderId, folders])

  return (
    <>
      <OpenChatButton onOpen={handleOpen} messageCount={messagesFromFriends.length + messagesNotFromFriends.length} />
      <Modal className={cn()} backgroundImg={'bkg'} open={isOpen} onClose={handleClose}>
        <div className={cn('LeftMenu')}>
          <ChatFolders folders={folders} onChoiceFolder={handleOpenFolderId} />
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
            onIconClear={() => setComment('')}
            onChange={setComment}
            value={comment}
          />
          <UsersChats
            friends={openFolderId ? friends.filter(({ id }) => openUsersChats?.includes(id)) : friends}
            anyUsers={usersNotFriends}
            messagesFromFriends={messagesFromFriends}
            messagesNotFromFriends={messagesNotFromFriends}
            onChatOpen={setOpenedUserIdChat}
            openedUserIdChat={openedUserIdChat}
          />
        </div>
        <div className={cn('CurrentChat')}>
          <ChatContainer
            user={USER}
            targetUser={[...friends, ...usersNotFriends].find(({ id }) => id === openedUserIdChat)}
          />
        </div>
      </Modal>
    </>
  )
})
