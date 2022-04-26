import React from 'react'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { AddedFile } from '@client_shared/hooks/useMaterialsAttach'
import { makeCn } from '@client_shared/utils'
import styles from './Attachment.module.scss'


const cn = makeCn('Attachment', styles)

export enum ATTACHMENT_ACTION {
  SAVE = 'save',
  PLAY = 'play'
}

type AttachmentProps = {
  attach: AddedFile
  action: ATTACHMENT_ACTION
}

export const Attachment: React.FC<AttachmentProps> = (props) => {
  const { attach: { name, src }, action } = props

  return (
    <ButtonBox
      className={cn()}
      as={'a'}
      href={src}
      icon={'file-outlined'}
      download={action === ATTACHMENT_ACTION.SAVE}
    >
      <Icon className={cn('Icon')} icon={'file-outlined'} size={'small'} />
      <Text className={cn('Name')} children={name} size={'2'} />
    </ButtonBox>
  )
}
