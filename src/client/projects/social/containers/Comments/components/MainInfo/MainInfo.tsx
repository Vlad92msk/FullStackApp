import React from 'react'
import { UserSmall } from '@client/projects/social/components'
import { Text } from '@client_shared/components/Text'
import { length, makeCn } from '@client_shared/utils'
import { Actions } from '../'
import { CommentType } from '@client/projects/social/containers/Comments/data/comments.data'
import styles from './MainInfo.module.scss'

const cn = makeCn('MainInfo', styles)

export type MainInfoType = 'main' | 'sub'
type MainInfoProps = {
  type: MainInfoType
  comment: CommentType
  answersLength: number
  onOpenAnswer: React.Dispatch<React.SetStateAction<string>>
}
export const MainInfo: React.FC<MainInfoProps> = (props) => {
  const {
    type,
    comment: {
      userName,
      date,
      description,
      commentId,
      userIdsLikes,
      userIdsDislikes,
      appealToAnswerId,
      appealToUserName
    },
    answersLength,
    onOpenAnswer
  } = props

  return (
    <div className={cn()}>
      <div className={cn('Header')}>
        <div className={cn('UsersInf')}>
          <UserSmall textClassName={cn('AuthorName')} userName={userName} img={'ava'} />
          {appealToAnswerId && (
            <>
              <Text className={cn('For')} children={'для'} size={'1'} />
              <Text className={cn('ForUser')} children={appealToUserName} size={'1'} />
            </>
          )}
        </div>
        <Text className={cn('Date')} children={date} size={'1'} />
      </div>
      <Text
        className={cn('UserComment', { type: appealToAnswerId && 'answer' })}
        size={type === 'main' ? '2' : '1'}
        children={description}
      />
      <Actions
        id={commentId}
        type={type}
        likeCount={length(userIdsLikes)}
        answersCount={answersLength}
        disLikeCounts={length(userIdsDislikes)}
        onOpenAnswer={onOpenAnswer}
      />
    </div>
  )
}
