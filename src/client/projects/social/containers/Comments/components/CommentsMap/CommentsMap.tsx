import React, { useState } from 'react'
import { values } from 'lodash'

import { makeCn } from '@client_shared/utils'
import { ShowMore } from '@client_shared/components/ShowMore'
import { ServiceCommentsType, useServiceCommentsSelector } from '../../service'
import { AnswerWrapper, COMMENT_FOR, InputComment, MainInfo } from '../../components'
import styles from './CommentsMap.module.scss'

const cn = makeCn('CommentsMap', styles)


export type CommentsMapProps = {
  commentsHeight?: string
  isOverflow?: boolean
}


export const CommentsMap: React.FC<CommentsMapProps> = (props) => {
  const { commentsHeight, isOverflow } = props
  const commentsService = values(useServiceCommentsSelector('comments'))

  const [comments, setComments] = useState(commentsService.slice(0, 1))


  return (
    <div
      className={cn()}
      style={{ maxHeight: commentsHeight, overflowY: isOverflow ? 'auto' : null }}
    >
      {comments.map(
        (comment) => (
          <div key={comment.commentId} className={cn('Comment')}>
            <MainInfo type={'main'} comment={comment} />
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
      <ShowMore
        showArr={comments}
        totalArr={commentsService}
        set={setComments}
      />
    </div>
  )
}
