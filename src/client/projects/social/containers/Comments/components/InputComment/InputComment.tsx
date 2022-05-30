import React, { useState } from 'react'
import { AreaInput } from '@client/projects/social/components'
import { Text } from '@client/shared/components/Text'
import { makeCn } from '@client/shared/utils'
import styles from './InputComment.module.scss'

const cn = makeCn('InputComment', styles)
type InputCommentProps = {}
export const InputComment: React.FC<InputCommentProps> = () => {
  const [comment, setComment] = useState<string>(null)

  return (
    <div className={cn()}>
      <AreaInput onChange={setComment} value={comment} />
      <Text className={cn('Send', { disabled: !comment?.length })} children={'Отправить'} size={'1'} />
    </div>
  )
}
