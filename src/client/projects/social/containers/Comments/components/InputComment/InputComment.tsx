import React, { useCallback, useState } from 'react'
import { AreaInput } from '@client/projects/social/components'
import { Text } from '@client/shared/components/Text'
import { makeCn } from '@client/shared/utils'
import { commentsActions, useServiceCommentsAction } from '../../service'
import styles from './InputComment.module.scss'

const cn = makeCn('InputComment', styles)

type InputCommentProps = {
  targetCommentId?: string
  appealToCommentId: string
  appealToAnswerId: string
}
export const InputComment: React.FC<InputCommentProps> = (props) => {
  const { targetCommentId, appealToCommentId, appealToAnswerId } = props
  const dispatch = useServiceCommentsAction()
  const [comment, setComment] = useState('')

  const sentComment = useCallback(() => {
    dispatch(commentsActions.SET__SENT_COMMENT({
      targetCommentId,
      appealToCommentId,
      appealToAnswerId,
      value: comment
    }))
    setComment('')
  }, [targetCommentId, comment, appealToCommentId, appealToAnswerId])

  return (
    <div className={cn()}>
      <AreaInput onChange={setComment} value={comment} />
      <Text
        className={cn('Send', { disabled: !comment?.length })}
        size={'1'}
        onClick={sentComment}
        children={'Отправить'}
      />
    </div>
  )
}
