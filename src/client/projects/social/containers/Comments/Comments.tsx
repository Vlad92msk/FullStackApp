import React, { useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client/shared/components/Text'
import { AreaInput, UserSmall } from '@client/projects/social/components'
import { COMMENTS } from '../Comments/data/comments.data'
import { Actions, AnswerWrapper, CommentsWrapper } from '../Comments/components'
import styles from './Comments.module.scss'

const cn = makeCn('Comments', styles)

export type CommentsType = {
  isOpenComments: boolean
}


export const Comments: React.FC<CommentsType> = React.memo(
  ({
     isOpenComments
   }) => {
    const [comment, setComment] = useState<string>(null)
    const [openCommentId, setOpenCommentId] = useState<number>(null)

    return (
      <CommentsWrapper isOpenComments={isOpenComments}>
        <div className={cn('Filter')}>filters</div>
        <div className={cn('Container')}>
          <div className={cn('AuthorComment')}>
            <AreaInput onChange={setComment} value={comment} />
            <Text className={cn('Send', { disabled: !comment?.length })} children={'Отправить'} size={'1'} />
          </div>
          {COMMENTS.map(
            ({
               commentAuthor,
               commentDate,
               commentDescription,
               likeCount,
               disLikeCounts,
               answersCount,
               answers,
               commentId
             }) => (
              <div className={cn('Comment')}>
                <div className={cn('AuthorRow')}>
                  <UserSmall textClassName={cn('AuthorName')} userName={commentAuthor} img={'ava'} />
                  <Text className={cn('Date')} children={commentDate} size={'1'} />
                </div>
                <Text className={cn('UserComment')} size={'2'} children={commentDescription} />
                <Actions
                  id={commentId}
                  likeCount={likeCount}
                  answersCount={answersCount}
                  disLikeCounts={disLikeCounts}
                  onOpenAnswer={setOpenCommentId}
                />
                <AnswerWrapper isOpenComments={openCommentId === commentId}>
                  {answers.map(
                    ({
                       commentAuthor,
                       commentDate,
                       commentDescription,
                       likeCount,
                       disLikeCounts
                     }) => (
                      <div className={cn('AnswerComment')}>
                        <div className={cn('AnswerCommentAuthorRow')}>
                          <UserSmall textClassName={cn('AuthorName')} userName={commentAuthor} img={'ava'} />
                          <Text className={cn('Date')} children={commentDate} size={'1'} />
                        </div>
                        <Text className={cn('UserComment')} size={'1'} children={commentDescription} />
                        <Actions
                          id={commentId}
                          likeCount={likeCount}
                          answersCount={answersCount}
                          disLikeCounts={disLikeCounts}
                        />
                      </div>
                    ))}
                </AnswerWrapper>
              </div>
            ))}
        </div>
      </CommentsWrapper>
    )
  })
