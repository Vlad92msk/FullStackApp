import React, { useEffect, useState } from 'react'
import { Friend } from '@client/projects/social/containers/Messages/components'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { UserType } from '../../../App/data/user'
import {
  message$,
  useMessageStateValue,
  useUseMessageStateChange
} from '@client/projects/social/containers/Messages/useMessageState'
import {
  useUserMenuState,
} from '@client/projects/social/containers/UserMenu/useUserMenuState'
import { ALL_USERS } from '@client/projects/social/containers/UserMenu/data/all_users'
import { FoldersChat } from '@client/projects/social/containers/Messages/data/foldersChats'
import { Message } from '@client/projects/social/containers/UserMenu/data/messages'
import styles from './UsersChats.module.scss'

const cn = makeCn('UsersChats', styles)

type UsersChatsProps = {}
export const UsersChats: React.FC<UsersChatsProps> = React.memo((props) => {
  const setMessageState = useUseMessageStateChange(message$)

  const openFolderId = useMessageStateValue<number>('openFolderId')
  const folders = useMessageStateValue<FoldersChat[]>('folders')
  const newMessages = useMessageStateValue<Message[]>('newMessages')
  const messageNotFromFriends = useMessageStateValue<Message[]>('messageNotFromFriends')
  const messageFromFriends = useMessageStateValue<Message[]>('messageFromFriends')

  const { friends, currenUser } = useUserMenuState()
  const [currentFriends, setCurrentFriends] = useState<UserType[]>([])
  const [currentNotFriends, setCurrentNotFriends] = useState<UserType[]>([])

  /**
   * Раскидываем сообщения - От друзей/нет от друзей
   */
  useEffect(() => {
    setMessageState({
      messageFromFriends: newMessages?.filter(({ fromUserId }) => currenUser?.friends.includes(fromUserId)) || []
    })
  }, [newMessages, currenUser?.friends])
  useEffect(() => {
    setMessageState({
      messageNotFromFriends: newMessages?.filter(({ fromUserId }) => !currenUser?.friends.includes(fromUserId)) || []
    })
  }, [newMessages, currenUser?.friends])

  /**
   * Формируем массив друзей отфильтрованных по выбранной папке
   */
  useEffect(() => {
    if (openFolderId) {
      /**
       * Достаем ID пользователей в папках
       */
      const usersInFolders = folders?.find(({ id }) => id === openFolderId)?.users
      /**
       * Создаем список пользователей данной папки
       */
      setCurrentFriends(friends.filter(({ id }) => usersInFolders?.includes(id)))
    } else {
      /**
       * Если ID папки нет - показываем всех пользователей
       */
      setCurrentFriends(friends)
    }
  }, [openFolderId, folders, friends])

  /**
   * Формируем массив пользователей приславших сообщения, но не в друзьях
   */
  useEffect(() => {
    const aaa = messageNotFromFriends.map(({ fromUserId }) => fromUserId)
    setCurrentNotFriends(ALL_USERS.filter(({ id }) => aaa.includes(id)))
  }, [messageNotFromFriends, ALL_USERS])

  useEffect(() => {
    setMessageState({
      currentUsersChats: [...currentFriends, ...currentNotFriends]
    })
  }, [currentFriends, currentNotFriends])

  return (
    <div className={cn()}>
      {Boolean(currentFriends.length) && (
        <>
          <Text className={cn('Title')} children={'Чаты с друзьями'} size={'1'} />
          {currentFriends.map((friend) => (
            <Friend
              key={friend.id}
              friend={friend}
              friendMessageCount={
                messageFromFriends.filter(({ dateSeen }) => !Boolean(dateSeen)).length
              }
            />
          ))}
        </>
      )}
      {Boolean(currentNotFriends.length) && (
        <>
          <Text className={cn('Title')} children={'Чаты не с друзьями'} size={'1'} />
          {currentNotFriends.map((friend) => (
            <Friend
              key={friend.id}
              friend={friend}
              friendMessageCount={
                messageNotFromFriends.filter(({ dateSeen }) => !Boolean(dateSeen)).length
              }
            />
          ))}
        </>
      )}
    </div>
  )
})
