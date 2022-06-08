import React from 'react'
import { format } from 'date-fns'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Icon, IconFill } from '@client_shared/components/Icon'
import { IconName } from '@client/public/models/icon.model'
import { Attachment, ATTACHMENT_ACTION, SliderMedia } from '@client/projects/social/components'
import { useAttachmentsPurpose } from '@client/projects/social/components/Attachment/hooks'
import { Message } from '../../data/messages'
import styles from './ChatMassage.module.scss'
import { dateType1 } from '@client/shared/utils/date'

const cn = makeCn('ChatMassage', styles)

export enum MASSAGE_FROM {
  ME = 'me',
  OTHER = 'other'
}

export enum MassageSmileReaction {
  SMILE = 'smile',
  LIKE = 'like',
  DISLIKE = 'dislike'
}

export const massageSmileReactionIcon = {
  smile: 'smile' as IconName,
  like: 'heart' as IconName,
  dislike: 'dislike' as IconName
}

export const massageSmileReactionIconFill = {
  smile: 'light100' as IconFill,
  like: 'redRose40' as IconFill,
  dislike: 'bluePrimrose50' as IconFill
}

export type ChatMassageType = {
  message: Message
  from: MASSAGE_FROM
  isWasSeen: boolean

}

export const ChatMassage: React.FC<ChatMassageType> = (props) => {
  const { from, isWasSeen, message: { massage, smile, dateCreate, attachments } } = props
  const messageWasCreated = dateType1(dateCreate)

  const { toSave, toPlay, toSlider } = useAttachmentsPurpose(attachments)


  return (
    <div className={cn({ from })} style={{ width: attachments.length ? '80%' : 'auto' }}>
      <div className={cn('Content')}>
        <SliderMedia sliders={toSlider} height={'25vh'} />
        {toPlay.map((attach) => (
          <Attachment
            key={attach.name}
            attach={attach}
            action={ATTACHMENT_ACTION.PLAY}
          />
        ))}
        {toSave.map((attach) => (
          <Attachment
            key={attach.name}
            attach={attach}
            action={ATTACHMENT_ACTION.SAVE}
          />
        ))}
        <Text className={cn('Text')} size={'2'} children={massage} />
        {from === MASSAGE_FROM.ME && (
          <Icon
            className={cn('See', { from })}
            icon={isWasSeen ? 'eye' : 'eye-off'}
            size={'small'}
            fill={'oldAsphalt40'}
          />
        )}
      </div>
      <div className={cn('SystemInfo')} style={{
        justifyContent: from === MASSAGE_FROM.ME ? 'flex-end' : 'flex-start'
      }}>
        <Text size={'1'} children={messageWasCreated} />
        {smile && (
          <Icon
            className={cn('Smile', { from })}
            icon={massageSmileReactionIcon[smile]}
            size={'small'}
            fill={massageSmileReactionIconFill[smile]}
          />
        )}
      </div>
    </div>
  )
}
