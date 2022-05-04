import React, { useEffect } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Image } from '@client_shared/components/Image'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Button } from '@client_shared/components/Button'
import { IconButton } from '@client_shared/components/IconButton'
import { StatisticButtons } from '../UserMenu/components'
import { USER, UserType } from '../App/data/user'
import { ALL_USERS } from './data/all_users'
import {
  userMenuContainer$,
  useUserMenuStateChange,
  useUserMenuStateValue
} from '@client/projects/social/containers/UserMenu/useUserMenuState'
import styles from './UserMenu.module.scss'

const cn = makeCn('UserMenu', styles)


export const UserMenu: React.FC = React.memo(() => {
  const {
    img,
    family,
    hashName,
    name,
    id,
    friends: userFriends,
    status
  } = USER

  const friends = useUserMenuStateValue<UserType[]>('friends')
  const setUserMenuState = useUserMenuStateChange(userMenuContainer$)

  useEffect(() => {
    setUserMenuState({
      friends: ALL_USERS.filter(({ id }) => userFriends.includes(id)),
      possibleFriends: Array.from(
        new Set(friends.reduce((acc, item) => [...acc, ...item.friends], []))
      ).map((possibleUserId) => ALL_USERS.find(({ id }) => id === possibleUserId)).filter(Boolean),
      currenUser: USER
    })
  }, [userFriends])


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
              <span className={cn('UserStatusDot', { status })} />
              <Text className={cn('UserStatusText')} children={status} size={'2'} />
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
      <StatisticButtons />
    </section>
  )
})
