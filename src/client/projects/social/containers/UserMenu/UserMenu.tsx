import React from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Image } from '@client_shared/components/Image'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Button } from '@client_shared/components/Button'
import { IconButton } from '@client_shared/components/IconButton'
import { StatisticButtons } from '../UserMenu/components'
import { USER } from '../App/data/user'
import { ALL_USERS } from './data/all_users'
import { MESSAGES } from './data/messages'
import styles from './UserMenu.module.scss'

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


  return (
    <section className={cn()}>
      <div className={cn('User')}>
        <div className={cn('UserRow')}>
          <div className={cn('UserFIO')}>
            <Text className={cn('UserName')} size={'8'} weight={'medium'} children={`${family} ${name}`} />
            <IconButton fill={'oldAsphalt50'} size={'ordinary'} icon={'settings-2'} />
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
        {id !== 1 && (<div className={cn('Actions')}>
          <Button styleType={'rounded'} color={'blue'} icon={'message-square'} iconPosition={'left'}>
            <Text children={'Написать'} size={'2'} />
          </Button>
          <Button styleType={'rounded'} color={'red'} icon={'plus'} iconPosition={'left'}>
            <Text children={'Добавить'} size={'2'} />
          </Button>
        </div>)}
      </div>
      <StatisticButtons friends={friends} />
    </section>
  )
})
