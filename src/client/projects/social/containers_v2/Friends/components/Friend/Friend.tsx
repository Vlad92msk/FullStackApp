import React, { useCallback } from 'react'

import { UserSmall } from '@client/projects/social/components'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Friend as FriendType } from '../../data/friends'
import styles from './Friend.module.scss'

const cn = makeCn('Friend', styles)

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export type FriendComponent = {
  friend: FriendType
  onOpenChat: (userId: number) => void
}
export const Friend: React.FC<FriendComponent> = React.memo((props) => {
  const {
    onOpenChat,
    friend: { friendId, friendImg, friendMessageCount, friendName, friendStatus }
  } = props

  const handleOpenChat = useCallback(() => {
    onOpenChat(friendId)
  }, [friendId])

  return (
    <div className={cn()}>
      <UserSmall
        img={friendImg}
        className={cn('UserImgName')}
        textClassName={cn('UserName')}
        userName={friendName}
      />
      <div className={cn('CountMessage')}>
        <Text className={cn('CountMessageButton')} size={'1'} onClick={handleOpenChat}>
          <Icon className={cn('CountMessageIcon')} size={'small'} icon={'message-square'} />
          {friendMessageCount || null}
        </Text>
        <span className={cn('FriendStatus', { status: friendStatus })} />
      </div>
    </div>
  )
})
