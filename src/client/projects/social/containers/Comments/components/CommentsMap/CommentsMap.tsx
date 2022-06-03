import React from 'react'
import { values } from 'lodash'

import { makeCn } from '@client_shared/utils'
import { ServiceCommentsType, useServiceCommentsSelector } from '../../service'
import { AnswerWrapper, COMMENT_FOR, InputComment, MainInfo } from '../../components'
import { ArrayMap } from '@client/shared/components/ArrayMap'
import { CommentType } from '../../data/comments.data'
import styles from './CommentsMap.module.scss'

const cn = makeCn('CommentsMap', styles)


export type CommentsMapProps = {
  commentsHeight?: string
  isOverflow?: boolean
}


export const CommentsMap: React.FC<CommentsMapProps> = (props) => {
  const { commentsHeight, isOverflow } = props
  const commentsService = values(useServiceCommentsSelector('comments'))


  return (
    <div
      className={cn()}
      style={{ maxHeight: commentsHeight, overflowY: isOverflow ? 'auto' : null }}
    >
      <ArrayMap
        key={'commentId'}
        data={commentsService}
      >
        {(comment: ServiceCommentsType) => (
          <div className={cn('Comment')}>
            <MainInfo type={'main'} comment={comment} />
            <AnswerWrapper commentId={comment.commentId}>
              <InputComment inputFor={COMMENT_FOR.COMMENT} />
              <ArrayMap
                key={'commentId'}
                data={comment.answers}
              >
                {(answer: CommentType) => (
                  <MainInfo type={'sub'} comment={answer} />
                )}
              </ArrayMap>
            </AnswerWrapper>
          </div>
        )}
      </ArrayMap>
    </div>
  )
}
