import React from 'react'

import { makeCn } from '@client_shared/utils'
import { ServiceCommentsType, useServiceCommentsSelector } from '../../service'
import {
  AnswerWrapper,
  COMMENT_FOR,
  InputComment,
  MainInfo
} from '../../components'
import styles from './CommentsMap.module.scss'

const cn = makeCn('CommentsMap', styles)


export type CommentsMapProps = {
  commentsHeight?: string
  isOverflow?: boolean
}

export const CommentsMap: React.FC<CommentsMapProps> = (props) => {
  const { commentsHeight, isOverflow } = props
  const comments = useServiceCommentsSelector('comments')

  return (
        <div
          className={cn()}
          style={{ maxHeight: commentsHeight, overflowY: isOverflow ? 'auto' : null }}
        >
          {Object.values(comments).map(
            (comment) => (
              <div key={comment.commentId} className={cn('Comment')}>
                <MainInfo
                  type={'main'}
                  comment={comment}
                />
                <AnswerWrapper commentId={comment.commentId}>
                  <InputComment inputFor={COMMENT_FOR.COMMENT} />
                  {comment.answers.map(
                    (answer: ServiceCommentsType) => (
                      <MainInfo
                        key={answer.commentId}
                        type={'sub'}
                        comment={answer}
                      />
                    ))}
                </AnswerWrapper>
              </div>
            ))}
        </div>
  )
}
