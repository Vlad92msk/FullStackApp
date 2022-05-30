import React from 'react'
import { UserSmall } from '@client/projects/social/components'
import { Text } from '@client/shared/components/Text'
import { makeCn } from '@client/shared/utils'
import styles from './AuthorInfo.module.scss'

const cn = makeCn('AuthorInfo', styles)


type AuthorInfoProps = {
  author: string
  date: string
}
export const AuthorInfo: React.FC<AuthorInfoProps> = (props) => {
  const { author, date } = props

  return (
    <div className={cn()}>
      <UserSmall textClassName={cn('AuthorName')} userName={author} img={'ava'} />
      <Text className={cn('Date')} children={date} size={'1'} />
    </div>
  )
}
