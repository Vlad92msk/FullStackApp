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
  userMenuActions,
  useServiceUserMenuAction,
  useServiceUserMenuSelector
} from './service'
import styles from './UserMenu.module.scss'

const cn = makeCn('UserMenu', styles)


export const UserMenu: React.FC = React.memo(() => {
  const dispatch = useServiceUserMenuAction()

  const {
    img,
    family,
    hashName,
    name,
    id,
    status
  } = useServiceUserMenuSelector('currenUser')

  useEffect(() => {
    setTimeout(() => dispatch(userMenuActions.INJECT__USER_INFO({
      currentUser: USER,
      allUsers: ALL_USERS
    })), 200)
  }, [])


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
