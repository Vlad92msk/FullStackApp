import React, { useCallback } from 'react'

import { UserSmall } from '@client/projects/social/components'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import styles from './Friend.module.scss'
import { UserType } from '@client/projects/social/containers_v2/App/data/user'

const cn = makeCn('Friend', styles)

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export type FriendComponent = {
  friend: UserType
  friendMessageCount: number
  onOpenChat: (userId: number) => void
}
export const Friend: React.FC<FriendComponent> = React.memo((props) => {
  const {
    onOpenChat,
    friendMessageCount,
    friend: { status, name, id, img, family }
  } = props

  const handleOpenChat = useCallback(() => {
    onOpenChat(id)
  }, [id])

  return (
    <div className={cn()}>
      <UserSmall
        img={img}
        className={cn('UserImgName')}
        textClassName={cn('UserName')}
        userName={`${name} ${family}`}
      />
      <div className={cn('CountMessage')}>
        <Text className={cn('CountMessageButton')} size={'1'} onClick={handleOpenChat}>
          <Icon className={cn('CountMessageIcon')} size={'small'} icon={'message-square'} />
          {friendMessageCount || null}
        </Text>
        <span className={cn('FriendStatus', { status })} />
      </div>
    </div>
  )
})
