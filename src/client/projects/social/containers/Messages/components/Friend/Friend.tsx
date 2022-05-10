import React, { useCallback } from 'react'

import { UserSmall } from '@client/projects/social/components'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'

import { UserType } from '../../../App/data/user'
import { ButtonBox } from '@client/shared/components/ButtonBox'
import {
  useMessageServiceActions,
  useMessageServiceStore
} from '@client/projects/social/containers/Messages/messageServiceState'
import styles from './Friend.module.scss'

const cn = makeCn('Friend', styles)


export type FriendComponent = {
  friend: UserType
  friendMessageCount: number
}
export const Friend: React.FC<FriendComponent> = React.memo((props) => {
  const {
    friendMessageCount,
    friend: { status, name, id, img, family }
  } = props
  const openUserIdChat = useMessageServiceStore('openUserIdChat')
  const setOpenUserIdChat = useMessageServiceActions('openUserIdChat')

  const handleOpenChat = useCallback(() => {
    setOpenUserIdChat({ userId: id })
  }, [id])

  return (
    <ButtonBox className={cn({ active: openUserIdChat === id })} onClick={handleOpenChat}>
      <UserSmall
        img={img}
        className={cn('UserImgName')}
        textClassName={cn('UserName')}
        userName={`${name} ${family}`}
        status={status}
      />
      <div className={cn('CountMessage')}>
        <Text className={cn('CountMessageButton', { active: openUserIdChat === id })} size={'1'}>
          {friendMessageCount || null}
          <Icon className={cn('CountMessageIcon')} size={'small'} icon={'message-square'} />
        </Text>
      </div>
    </ButtonBox>
  )
})
