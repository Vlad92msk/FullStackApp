import React from 'react'
import { format } from 'date-fns'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Icon, IconFill } from '@client_shared/components/Icon'
import { IconName } from '@client/public/models/icon.model'
import { SliderMedia } from '@client/projects/social/components'
import { Message } from '../../data/messages'
import styles from './ChatMassage.module.scss'

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

export const ChatMassage: React.FC<ChatMassageType> = React.memo((props) => {
  const { from, isWasSeen, message: { massage, smile, dateCreate, attachments } } = props
  const messageWasCreated = format(dateCreate, 'dd.MM.yyyy в HH:mm')

  return (
    <div className={cn({ from })} style={{ width: attachments.length ? '80%' : 'auto' }}>
      <div className={cn('Content')}>
        <SliderMedia sliders={attachments} height={'25vh'} />
        <Text className={cn('Text')} size={'2'} children={massage} />
        {from === MASSAGE_FROM.ME && (
          <Icon
            className={cn('See', { from })}
            icon={isWasSeen ? 'eye' : 'eye-off'}
            size={'small'} fill={'oldAsphalt40'}
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
})
