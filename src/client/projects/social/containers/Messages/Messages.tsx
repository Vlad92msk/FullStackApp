import React, { useCallback, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Modal } from '@client_shared/components/Modal'
import { Icon } from '@client_shared/components/Icon'
import { useBooleanState } from '@client_shared/hooks'
import { ChatContainer } from './components'
import { USER } from '../App/data/user'

import { MESSAGES } from './data/messages'
import { Friend } from './components'
import { AreaInput } from '@client_shared/components/AreaInput'
import { Image } from '@client/shared/components/Image'
import { ALL_USERS } from '../UserMenu/data/all_users'
import styles from './Messages.module.scss'

export const Messages: React.FC = React.memo(() => {
  const {
    id,
    friends: userFriends,
  } = USER

  const [isOpen, handleOpen, handleClose] = useBooleanState(true)
  const [comment, setComment] = useState<string>(null)

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
   * Флаг открытия Списка друзей
   */
  const [openFriends, setOpenFriends, onCloseFriends] = useBooleanState(false)

  /**
   * ID пользователя, чат с которым открыт
   */
  const [openedUserIdChat, setOpenedUserIdChat] = useState<number>(2)

  /**
   * Открыть чат с выбранным пользователем
   */
  const handleOpenChat = useCallback((userId: number) => {
    setOpenedUserIdChat(userId)
  }, [])


  return (
    <>
      <ButtonBox className={cn('Chat')} onClick={handleOpen}>
        <Icon className={cn('ChatIcon')} icon={'message-square'} size={'ordinary'} />
        <Text className={cn('ChatCount')} children={12} size={'7'} />
      </ButtonBox>
      <Modal className={cn()} open={isOpen} onClose={handleClose}>
        <Image
          path={{
            img: 'bkg',
            project: 'social'
          }}
        />
        <div className={cn('LeftMenu')}>left</div>
        <div className={cn('PrevChats')}>
          <AreaInput
            as={'input'}
            inputClassName={cn('SearchInput')}
            icon={{
              size: 'ordinary',
              icon: 'search',
              fill: 'oldAsphalt40'
            }}
            onChange={setComment}
            value={comment}
          />
          {usersNotFriends.length && (
            <Text className={cn('PrevChatsTitle')} children={'Чаты с друзьями'} size={'1'} />)}
          {friends
          .map((friend) => (
            <Friend
              key={friend.id}
              friend={friend}
              onOpenChat={handleOpenChat}
              friendMessageCount={
                messagesFromFriends.filter(({ dateSeen }) => !Boolean(dateSeen)).length
              }
            />
          ))}
          <Text className={cn('PrevChatsTitle')} children={'Чаты не с друзьями'} size={'1'} />
          {usersNotFriends
          .map((friend) => (
            <Friend
              key={friend.id}
              friend={friend}
              onOpenChat={handleOpenChat}
              friendMessageCount={
                messagesNotFromFriends.filter(({ dateSeen }) => !Boolean(dateSeen)).length
              }
            />
          ))}
        </div>
        <div className={cn('CurrentChat')}>
          <ChatContainer
            openedUserIdChat={openedUserIdChat}
            targetUser={[...friends, ...usersNotFriends].find(({ id }) => id === openedUserIdChat)}
          />
        </div>
      </Modal>
    </>
  )
})


const cn = makeCn('Messages', styles)
