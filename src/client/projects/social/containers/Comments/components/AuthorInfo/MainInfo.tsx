import React from 'react'
import { UserSmall } from '@client/projects/social/components'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { Actions } from '../'
import styles from './MainInfo.module.scss'

const cn = makeCn('MainInfo', styles)


type MainInfoProps = {
  author: string
  date: string
  commentId: number
  likeCount: number
  disLikeCounts: number
  answersCount: number
  description: string
  onOpenAnswer: React.Dispatch<React.SetStateAction<number>>
}
export const MainInfo: React.FC<MainInfoProps> = (props) => {
  const { author, date, onOpenAnswer, commentId, disLikeCounts, likeCount, answersCount, description } = props

  return (
    <>
      <div className={cn()}>
        <UserSmall textClassName={cn('AuthorName')} userName={author} img={'ava'} />
        <Text className={cn('Date')} children={date} size={'1'} />
      </div>
      <Text className={cn('UserComment')} size={'2'} children={description} />
      <Actions
        id={commentId}
        likeCount={likeCount}
        answersCount={answersCount}
        disLikeCounts={disLikeCounts}
        onOpenAnswer={onOpenAnswer}
      />
    </>
  )
}

MainInfo.defaultProps = {
  author: '',
  date: '',
  commentId: 0,
  likeCount: 0,
  disLikeCounts: 0,
  answersCount: 0,
  description: ''
}
