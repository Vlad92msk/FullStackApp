import React, { useCallback, useEffect, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Image } from '@client_shared/components/Image'
import { Icon } from '@client_shared/components/Icon'
import { useBooleanState } from '@client_shared/hooks'
import { USER } from '../App/data/user'
import { ALL_USERS } from './data/all_users'
import { MESSAGES } from './data/messages'
import { ChatContainer, FriendsContainer, UserInfo } from './components'
import styles from './UserMenu.module.scss'
import { Line } from '@client/projects/social/components/Line/Ddd'

const cn = makeCn('UserMenu', styles)


export const UserMenu: React.FC = React.memo(() => {
  const {
    img,
    description,
    family,
    hashName,
    name,
    id,
    friends: userFriends,
    professionalInformation,
    baseInformation
  } = USER
  /**
   * Только друзья
   */
  const friends = ALL_USERS.filter(({ id }) => userFriends.includes(id))

  /**
   * Возможеные друзья
   */
  const possibleFriendsIds = Array.from(
    new Set(friends.reduce((acc, item) => [...acc, ...item.friends], []))
  ).filter((id) => !userFriends.includes(id))
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
   * Флаг открытия Списка друзей
   */
  const [openFriends, setOpenFriends, onCloseFriends] = useBooleanState(false)
  /**
   * Флаг открытия инф по хешу
   */
  const [openHash, setOpenHash, onCloseHash] = useBooleanState(false)
  /**
   * ID пользователя, чат с которым открыт
   */
  const [openedUserIdChat, setOpenedUserIdChat] = useState<number>(null)

  /**
   * Открыть чат с выбранным пользователем
   */
  const handleOpenChat = useCallback((userId: number) => {
    setOpenedUserIdChat(userId)
  }, [])
  /**
   * Закрыть чат с выбранным пользователем
   */
  const handleCloseChat = useCallback(() => {
    setOpenedUserIdChat(null)
  }, [])
  /**
   * Закрываем диалоги, если закрыли список друзей
   */
  useEffect(() => {
    if (!openFriends) {
      handleCloseChat()
    }
  }, [openFriends])

  /**
   * Закрываем друзей, если закрыли диалоги
   */
  useEffect(() => {
    if (openedUserIdChat) {
      setOpenFriends()
    }
  }, [openedUserIdChat])

  return (
    <section className={cn()}>
      <div className={cn('Main')}>
        <div className={cn('Photo')}>
          <Image path={{ project: 'social', img }} />
        </div>
        <div className={cn('Column')}>
          <div className={cn('UserFIO')}>
            <Text className={cn('UserName')} size={'8'} weight={'medium'} children={`${family} ${name}`} />
          </div>
          <Text className={cn('Hash')} size={'2'} children={`#${hashName}`} />
          <div className={cn('Row')}>
            <Text className={cn('ButtonText')} size={'2'} onClick={setOpenFriends}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'friends'} />
              {friends?.length || 0}
            </Text>
            <Text className={cn('ButtonText')} size={'2'} onClick={() => handleOpenChat(messages[0].fromUserId)}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'} />
              {messages?.length || 0}
            </Text>
            <Text className={cn('ButtonText')} size={'2'} onClick={setOpenHash}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'hash'} />
              3
            </Text>
          </div>
          <Line />
          <Text className={cn('Description')} size={'2'} children={description} />
        </div>
      </div>
      <div className={cn('Gap')}>
        <Line />
      </div>
      <UserInfo
        baseInformation={baseInformation}
        professionalInformation={professionalInformation}
      />
      <FriendsContainer
        friends={friends}
        friendsMessages={messagesFromFriends}

        possibleFriends={possibleFriends}

        anyUsersNotFriends={usersNotFriends}
        anyUsersMessages={messagesNotFromFriends}

        isOpenFriends={openFriends}
        handleOpenChat={handleOpenChat}
        handleCloseFriends={onCloseFriends}
      />
      <ChatContainer
        openedUserIdChat={openedUserIdChat}
        targetUser={[...friends, ...usersNotFriends].find(({ id }) => id === openedUserIdChat)}
        handleCloseChat={handleCloseChat}
      />
    </section>
  )
})
