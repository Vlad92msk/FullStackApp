import React, { useCallback, useState } from 'react'
import { AreaInput } from '@client/projects/social/components'
import { Text } from '@client/shared/components/Text'
import { makeCn } from '@client/shared/utils'
import styles from './InputComment.module.scss'
import { commentsActions, useServiceCommentsAction } from '@client/projects/social/containers/Comments/service'

const cn = makeCn('InputComment', styles)

export enum COMMENT_FOR {
  ENTITY = 'SET__COMMENT_FOR_ENTITY',
  COMMENT = 'SET__COMMENT_FOR_COMMENT',
  ANSWER = 'SET__COMMENT_FOR_ANSWER',
}

type InputCommentProps = {
  inputFor: COMMENT_FOR
}
export const InputComment: React.FC<InputCommentProps> = React.memo((props) => {
  const { inputFor } = props
  const dispatch = useServiceCommentsAction()
  const [comment, setComment] = useState('')

  const handleChange = useCallback((value: string, name?: string) => {
    setComment(value)
    dispatch(commentsActions[name]({ inputValue: value }))
  }, [])

  return (
    <div className={cn()}>
      <AreaInput name={inputFor} onChange={handleChange} value={comment} />
      <Text className={cn('Send', { disabled: !comment?.length })} children={'Отправить'} size={'1'} />
    </div>
  )
})
