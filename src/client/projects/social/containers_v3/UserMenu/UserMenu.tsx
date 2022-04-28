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
import { Line } from '@client/projects/social/components'
import styles from './UserMenu.module.scss'
import { ButtonBox } from '@client/shared/components/ButtonBox'
import { Button } from '@client/shared/components/Button'
import { IconButton } from '@client/shared/components/IconButton'

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
      <div className={cn('User')}>
        <div className={cn('UserRow')}>
          <div className={cn('UserFIO')}>
            <Text className={cn('UserName')} size={'8'} weight={'medium'} children={`${family} ${name}`} />
            <IconButton fill={'oldAsphalt50'} size={'medium'} icon={'settings-2'} />
          </div>
          <div className={cn('Row')}>
            <ButtonBox className={cn('UserStatus')}>
              <span className={cn('UserStatusDot', { status: 'online' })} />
              <Text className={cn('UserStatusText')} children={'Online'} size={'2'} />
            </ButtonBox>
            <Text className={cn('Hash')} size={'2'} children={`#${hashName}`} />
          </div>
        </div>
        <div className={cn('Photo')}>
          <Image sizePriority={'contain'} path={{ project: 'social', img }} />
        </div>
        <div className={cn('Actions')}>
          <Button styleType={'rounded'} color={'blue'} icon={'message-square'} iconPosition={'left'}>
            <Text children={'Написать'} size={'2'} />
          </Button>
          <Button styleType={'rounded'} color={'red'} icon={'plus'} iconPosition={'left'}>
            <Text children={'Добавить'} size={'2'} />
          </Button>
        </div>
      </div>
      <div className={cn('Column')}>
        <ButtonBox className={cn('ButtonTextBox')} onClick={setOpenFriends}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'friends'} />
            <Text children={friends?.length || 0} size={'8'} />
          </div>
          <Text children={'Контактов'} />
        </ButtonBox>
        <ButtonBox className={cn('ButtonTextBox')} onClick={() => handleOpenChat(messages[0].fromUserId)}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'} />
            <Text children={messages?.length || 0} size={'8'} />
          </div>
          <Text children={'Сообщений'} />
        </ButtonBox>
        <ButtonBox className={cn('ButtonTextBox')} onClick={setOpenHash}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'hash'} />
            <Text children={300} size={'8'} />
          </div>
          <Text children={'Отметок'} />
        </ButtonBox>
      </div>

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
