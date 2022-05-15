import React, { useCallback, useMemo } from 'react'

import { UserSmall } from '@client/projects/social/components'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { ButtonBox } from '@client_shared/components/ButtonBox'

import { UserType } from '../../../App/data/user'
import { useMessageServiceAction, useMessageServiceValue } from '../../service/MessageService'
import { messageService, SET__OPEN_CHAT_ID__PAYLOAD } from '../../service'
import styles from './Friend.module.scss'


const cn = makeCn('Friend', styles)


export type FriendComponent = {
  friend: UserType
}
export const Friend: React.FC<FriendComponent> = React.memo((props) => {
  const {
    friend: { status, name, id, img, family }
  } = props

  const allMessages = useMessageServiceValue('allMessages')
  const openUserIdChat = useMessageServiceValue('openUserIdChat')
  const [_, setOpenUserIdChat] = useMessageServiceAction<'openUserIdChat', SET__OPEN_CHAT_ID__PAYLOAD>('SET__OPEN_CHAT_ID')

  const handleOpenChat = useCallback(() => {
    setOpenUserIdChat({ userId: id })
  }, [id])

  const newMessageCount = useMemo(() => {
    return allMessages[id]?.filter(({ dateSeen }) => !Boolean(dateSeen)).length
  }, [allMessages, id])

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
          {newMessageCount}
          <Icon className={cn('CountMessageIcon')} size={'small'} icon={'message-square'} />
        </Text>
      </div>
    </ButtonBox>
  )
})
