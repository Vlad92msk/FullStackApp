import React, { useCallback, useState } from 'react'

import {  makeCn } from '@client_shared/utils'
import { COMMENTS, CommentType } from '../Comments/data/comments.data'
import {
  AnswerWrapper,
  MainInfo,
  CommentsOpenType,
  CommentsWrapper,
  InputComment,
  ShowMore, Filters
} from '../Comments/components'
import { ServiceCommentsType, useServiceCommentsSelector } from './service'
import styles from './Comments.module.scss'

const cn = makeCn('Comments', styles)


/**
 * По сколько комментариев отображать
 */
export const COUNT_VISIBLE_COMMENTS = 1


export type CommentsProps = {
  isOpenComments: boolean
  width?: string
  commentsHeight?: string
  openType?: CommentsOpenType
  isOverflow?: boolean
}

export const Comments: React.FC<CommentsProps> = React.memo(
  ({
     isOpenComments,
     width,
     commentsHeight,
     openType,
     isOverflow
   }) => {
    const d = useServiceCommentsSelector('comments')
console.log('d', d)
    const [openCommentId, setOpenCommentId] = useState<string>(null)

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
        <Filters />
        <div className={cn('Container')}>
          <InputComment />
          <div
            className={cn('CommentsArray')}
            style={{ maxHeight: commentsHeight, overflowY: isOverflow ? 'auto' : null }}
          >
            {Object.values(d).map(
              (comment) => (
                <div key={comment.commentId} className={cn('Comment')}>
                  <MainInfo
                    type={'main'}
                    comment={comment}
                    onOpenAnswer={setOpenCommentId}
                  />
                  <AnswerWrapper isOpenComments={openCommentId === comment.commentId}>
                    <InputComment />
                    {comment.answers.map(
                      (answer: ServiceCommentsType) => (
                        <MainInfo
                          key={answer.commentId}
                          type={'sub'}
                          comment={answer}
                          onOpenAnswer={setOpenCommentId}
                        />
                      ))}
                  </AnswerWrapper>
                </div>
              ))}
            <ShowMore handleOpenComments={handleOpenComments} commentsLength={comments.length} />
          </div>
        </div>
      </CommentsWrapper>
    )
  })

Comments.defaultProps = {
  openType: 'horizontal',
  isOverflow: true
}
