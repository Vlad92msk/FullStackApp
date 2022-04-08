import React, { useCallback, useEffect, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Icon, IconFill } from '@client/shared/components/Icon'
import styles from './ChatMassage.module.scss'
import { IconName } from '@client/public/models/icon.model'

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
  from: MASSAGE_FROM
  massage: string
  isWasSeen: boolean
  smile?: MassageSmileReaction
  date: string
}

export const ChatMassage: React.FC<ChatMassageType> = React.memo((props) => {
  const { from, massage, smile, isWasSeen, date } = props

  return (
    <div className={cn({ from })}>
      <Text className={cn('Text')} size={'2'} children={massage} />
      <Icon
        className={cn('See', { from })}
        icon={isWasSeen ? 'eye' : 'eye-off'}
        size={'small'} fill={'oldAsphalt40'}
      />
      <div className={cn('SystemInfo')}>
        <Text size={'1'} children={date} />
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
