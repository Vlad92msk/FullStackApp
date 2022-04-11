import React, { useCallback, useEffect, useState } from 'react'

import { makeCn } from '@client_shared/utils'

import { Text } from '@client_shared/components/Text'
import { Image } from '@client_shared/components/Image'
import { Icon } from '@client_shared/components/Icon'
import { useBooleanState } from '@client_shared/hooks'
import { Friends } from '@client/projects/social/containers_v2/Friends'
import { Chat } from '@client/projects/social/containers_v2/Chat'
import { USER } from '@client/projects/social/containers_v2/App/data/user'
import { FRIENDS } from '@client/projects/social/containers_v2/Friends/data/friends'
import { MESSAGES } from '@client/projects/social/containers_v2/Chat/data/messages'
import styles from './UserMenu.module.scss'

const cn = makeCn('UserMenu', styles)


export const UserMenu: React.FC = React.memo(() => {
  const { img, description, family, hashName, name, id } = USER
  const friends = FRIENDS
  const messages = MESSAGES
  /**
   * Флаг открытия Списка друзей
   */
  const [openFriends, setOpenFriends, onCloseFriends] = useBooleanState(false)
  /**
   * Флаг открытия инф по хешу
   */
  const [openHash, setOpenHash, onCloseHash] = useBooleanState(false)
  /**
   * ID пользователя, чат с которым открыт
   */
  const [openedUserIdChat, setOpenedUserIdChat] = useState<number>(null)

  /**
   * Открыть чат с выбранным пользователем
   */
  const handleOpenChat = useCallback((userId: number) => {
    setOpenedUserIdChat(userId)
  }, [])
  /**
   * Закрыть чат с выбранным пользователем
   */
  const handleCloseChat = useCallback(() => {
    setOpenedUserIdChat(null)
  }, [])
  /**
   * Закрываем диалоги, если закрыли список друзей
   */
  useEffect(() => {
    if (!openFriends) {
      handleCloseChat()
    }
  }, [openFriends])

  /**
   * Закрываем друзей, если закрыли диалоги
   */
  useEffect(() => {
    if (openedUserIdChat) {
      setOpenFriends()
    }
  }, [openedUserIdChat])

  return (
    <section className={cn()}>
      <div className={cn('Main')}>
        <div className={cn('Photo')}>
          <Image path={{ project: 'social', img }} />
        </div>
        <div className={cn('Column')}>
          <div className={cn('UserFIO')}>
            <Text className={cn('UserName')} size={'8'} weight={'medium'} children={family} />
            <Text className={cn('UserName')} size={'8'} weight={'medium'} children={name} />
          </div>
          <Text className={cn('Hash')} size={'2'} children={`#${hashName}`} />
          <div className={cn('Row')}>
            <Text className={cn('ButtonText')} size={'2'} onClick={setOpenFriends}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'friends'} />
              {friends?.length || null}
            </Text>
            <Text className={cn('ButtonText')} size={'2'} onClick={() => handleOpenChat(1)}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'} />
              {messages?.length || null}
            </Text>
            <Text className={cn('ButtonText')} size={'2'} onClick={setOpenHash}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'hash'} />
              3
            </Text>
          </div>
          <span className={cn('Gap')} />
          <Text className={cn('Description')} size={'2'} children={description} />
        </div>
      </div>
      <div className={cn('Any')}></div>
      <Friends
        isOpenFriends={openFriends}
        handleOpenChat={handleOpenChat}
        handleCloseFriends={onCloseFriends}
      />
      <Chat
        openedUserIdChat={openedUserIdChat}
        targetUser={FRIENDS.find(({ friendId }) => friendId === openedUserIdChat)}
        handleCloseChat={handleCloseChat}
      />
    </section>
  )
})
