import React from 'react'
import { format } from 'date-fns'

import { makeCn } from '@client/shared/utils'
import { Text } from '@client/shared/components/Text'
import { Icon, IconFill } from '@client/shared/components/Icon'
import { IconName } from '@client/public/models/icon.model'
import { Message } from '@client/projects/social/containers_v2/Chat/data/messages'
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
  const { from, isWasSeen, message: { massage, smile, dateCreate } } = props
  const messageWasCreated = format(dateCreate, 'dd.MM.yyyy в H:mm')


  return (
    <div className={cn({ from })}>
      <Text className={cn('Text')} size={'2'} children={massage} />
      <Icon
        className={cn('See', { from })}
        icon={isWasSeen ? 'eye' : 'eye-off'}
        size={'small'} fill={'oldAsphalt40'}
      />
      <div className={cn('SystemInfo')}>
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
