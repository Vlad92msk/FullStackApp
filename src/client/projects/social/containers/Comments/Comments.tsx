import React, { useCallback, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client/shared/components/Text'
import { Button } from '@client/shared/components/Button'
import { AreaInput, UserSmall } from '@client/projects/social/components'
import { COMMENTS, CommentType } from '../Comments/data/comments.data'
import {
  Actions,
  AnswerWrapper,
  AuthorInfo,
  CommentsOpenType,
  CommentsWrapper,
  InputComment
} from '../Comments/components'
import styles from './Comments.module.scss'

const cn = makeCn('Comments', styles)


/**
 * По сколько комментариев отображать
 */
const COUNT_VISIBLE_COMMENTS = 1


export type CommentsType = {
  isOpenComments: boolean
  width?: string
  commentsHeight?: string
  openType?: CommentsOpenType
  isOverflow?: boolean
}

export const Comments: React.FC<CommentsType> = React.memo(
  ({
     isOpenComments,
     width,
     commentsHeight,
     openType,
     isOverflow
   }) => {
    const [comment, setComment] = useState<string>(null)
    const [openCommentId, setOpenCommentId] = useState<number>(null)

    const [commentsStart, setCommentsStart] = useState(0)
    const [comments, setComments] = useState<CommentType[]>([])

    /**
     * Открыть/подгрузить комментарии
     */
    const handleOpenComments = useCallback(() => {
      setComments(prev => [...prev, ...COMMENTS.slice(commentsStart, commentsStart + COUNT_VISIBLE_COMMENTS)])
      setCommentsStart(prev => prev + COUNT_VISIBLE_COMMENTS)
    }, [commentsStart])

    return (
      <CommentsWrapper width={width} isOpenComments={isOpenComments} openType={openType}>
        <div className={cn('Filter')}>filters</div>
        <div className={cn('Container')}>
          <InputComment />
          <div
            className={cn('CommentsArray')}
            style={{ maxHeight: commentsHeight, overflowY: isOverflow ? 'auto' : null }}
          >
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
                  <AuthorInfo author={commentAuthor} date={commentDate} />
                  <Text className={cn('UserComment')} size={'2'} children={commentDescription} />
                  <Actions
                    id={commentId}
                    likeCount={likeCount}
                    answersCount={answersCount}
                    disLikeCounts={disLikeCounts}
                    onOpenAnswer={setOpenCommentId}
                  />
                  <AnswerWrapper isOpenComments={openCommentId === commentId}>
                    <InputComment />
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
                          <AuthorInfo author={commentAuthor} date={commentDate} />
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
              disabled={comments.length === COMMENTS.length}
            >
              <Text
                size={'1'}
                children={`Показать ${comments.length ? 'еще' : `первые ${COUNT_VISIBLE_COMMENTS}`} [${comments.length}/${COMMENTS.length}]`}
              />
            </Button>
          </div>
        </div>
      </CommentsWrapper>
    )
  })

Comments.defaultProps = {
  openType: 'horizontal',
  isOverflow: true
}
