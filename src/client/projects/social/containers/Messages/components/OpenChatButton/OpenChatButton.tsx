import React from 'react'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'

import styles from './OpenChatButton.module.scss'

const cn = makeCn('OpenChatButton', styles)
type OpenChatButtonProps = {
  onOpen: () => void
  messageCount: number
}
export const OpenChatButton: React.FC<OpenChatButtonProps> = React.memo((props) => {
  const { onOpen, messageCount } = props
  return (
    <ButtonBox className={cn()} onClick={onOpen}>
      <Icon className={cn('Icon')} icon={'message-square'} size={'ordinary'} />
      <Text className={cn('Count')} children={messageCount} size={'7'} />
    </ButtonBox>
  )
}, (a, b) => a.messageCount === b.messageCount)
