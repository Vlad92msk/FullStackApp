import React from 'react'
import { UserSmall } from '@client/projects/social/components'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { dateType2 } from '@client/shared/utils/date'
import styles from './Header.module.scss'

const cn = makeCn('Header', styles)

type HeaderProps = {
  appealToAnswerId: string
  appealToUserName: string
  userName: string
  date: Date
}
export const Header: React.FC<HeaderProps> = (props) => {
  const { appealToUserName, userName, appealToAnswerId, date } = props

  return (
    <div className={cn()}>
      <div className={cn('UsersInf')}>
        <UserSmall textClassName={cn('AuthorName')} userName={userName} img={'ava'} />
        {appealToAnswerId && (
          <>
            <Text className={cn('For')} size={'1'} children={'для'} />
            <Text className={cn('ForUser')} size={'1'} children={appealToUserName} />
          </>
        )}
      </div>
      <Text className={cn('Date')} size={'1'} children={dateType2(date)} />
    </div>
  )
}
