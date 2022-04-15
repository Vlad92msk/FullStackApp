import React, { useCallback, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client/shared/components/Text'
import { AreaInput, UserSmall } from '@client/projects/social/components'
import { COMMENTS, CommentType } from '../Comments/data/comments.data'
import { Actions, AnswerWrapper, CommentsWrapper } from '../Comments/components'
import styles from './Comments.module.scss'
import { Button } from '@client/shared/components/Button'

const cn = makeCn('Comments', styles)

export type CommentsType = {
  isOpenComments: boolean
  width?: string
  commentsHeight?: string
}


export const Comments: React.FC<CommentsType> = React.memo(
  ({
     isOpenComments,
     width,
     commentsHeight
   }) => {
    const [comment, setComment] = useState<string>(null)
    const [openCommentId, setOpenCommentId] = useState<number>(null)

    const [commentsStart, setCommentsStart] = useState(0)
    const [comments, setComments] = useState<CommentType[]>([])

    const handleOpenComments = useCallback(() => {
      setComments(prev => [...prev, ...COMMENTS.slice(commentsStart, commentsStart + 1)])
      setCommentsStart(prev => prev + 1)
    }, [commentsStart])

    return (
      <CommentsWrapper width={width} isOpenComments={isOpenComments}>
        <div className={cn('Filter')}>filters</div>
        <div className={cn('Container')}>
          <div className={cn('AuthorComment')}>
            <AreaInput onChange={setComment} value={comment} />
            <Text className={cn('Send', { disabled: !comment?.length })} children={'Отправить'} size={'1'} />
          </div>
          <div className={cn('CommentsArray')} style={{ maxHeight: commentsHeight }}>
            {comments.map(
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
                <div key={commentId} className={cn('Comment')}>
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
                    <div className={cn('AuthorComment')}>
                      <AreaInput onChange={setComment} value={comment} />
                      <Text className={cn('Send', { disabled: !comment?.length })} children={'Отправить'} size={'1'} />
                    </div>
                    {answers.map(
                      ({
                         commentAuthor,
                         commentDate,
                         commentDescription,
                         likeCount,
                         disLikeCounts,
                         commentId
                       }) => (
                        <div key={commentId} className={cn('AnswerComment')}>
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
            <Button
              className={cn('OpenComments')}
              size={'small'}
              onClick={handleOpenComments}
              color={'grey'}
              styleType={'rounded'}
            >
              <Text
                size={'1'}
                children={`Показать комментарии [${comments.length}/${COMMENTS.length}]`}
              />
            </Button>
          </div>
        </div>
      </CommentsWrapper>
    )
  })
