import React, { useCallback, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { COMMENTS, CommentType } from '../Comments/data/comments.data'
import {
  AnswerWrapper,
  MainInfo,
  CommentsOpenType,
  CommentsWrapper,
  InputComment,
  ShowMore
} from '../Comments/components'
import styles from './Comments.module.scss'

const cn = makeCn('Comments', styles)


/**
 * По сколько комментариев отображать
 */
export const COUNT_VISIBLE_COMMENTS = 1


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
                  <MainInfo
                    author={commentAuthor}
                    date={commentDate}
                    disLikeCounts={disLikeCounts}
                    answersCount={answersCount}
                    description={commentDescription}
                    likeCount={likeCount}
                    commentId={commentId}
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
                          <MainInfo
                            author={commentAuthor}
                            date={commentDate}
                            disLikeCounts={disLikeCounts}
                            answersCount={answersCount}
                            description={commentDescription}
                            likeCount={likeCount}
                            commentId={commentId}
                            onOpenAnswer={setOpenCommentId}
                          />
                        </div>
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
