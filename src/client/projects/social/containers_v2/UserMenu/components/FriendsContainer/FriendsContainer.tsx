import React, { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client/shared/utils'
import { IconButton } from '@client/shared/components/IconButton'
import { Message } from '@client/projects/social/containers_v2/UserMenu/data/messages'
import { UserType } from '@client/projects/social/containers_v2/App/data/user'
import { Text } from '@client/shared/components/Text'
import { Switcher } from '../../../../components'
import { Line } from '../../../../components/Line/Ddd'
import { Friend } from '../index'
import styles from './FriendsContainer.module.scss'

const cn = makeCn('FriendsContainer', styles)


export type FriendsType = {
  isOpenFriends: boolean
  handleCloseFriends: () => void
  handleOpenChat: (userId: number) => void
  friends: UserType[]
  friendsMessages: Message[]
  anyUsersNotFriends: UserType[]
  anyUsersMessages: Message[]
}

export enum FILTER_FRIENDS {
  MY_FRIENDS = 'myFriends',
  POSSIBLE = 'possible',
  SEARCH = 'search'
}

const FRIENDS_SWITCH = [
  {
    value: FILTER_FRIENDS.MY_FRIENDS,
    name: 'friendsSwitch',
    label: 'мои'
  },
  {
    value: FILTER_FRIENDS.POSSIBLE,
    name: 'friendsSwitch',
    label: 'возможные'
  },
  {
    value: FILTER_FRIENDS.SEARCH,
    name: 'friendsSwitch',
    label: 'найти'
  }
]

export const FriendsContainer: React.FC<FriendsType> = React.memo((props) => {
  const {
    isOpenFriends,
    handleCloseFriends,
    handleOpenChat,
    friends,
    anyUsersMessages,
    anyUsersNotFriends,
    friendsMessages
  } = props

  /**
   * Переключатель
   */
  const [filterFriends, setFilterFriends] = useState<FILTER_FRIENDS>(FILTER_FRIENDS.MY_FRIENDS)
  const handleFriendsSwitch = useCallback((v) => {
      setFilterFriends(v)
    }
    , [])

  return (
    <AnimatePresence exitBeforeEnter>
      {
        isOpenFriends && (
          <>
            <motion.div
              className={cn()}
              initial={{ left: '-50%' }}
              animate={{ left: '100%' }}
              exit={{ left: '-50%' }}
              transition={{ duration: 1 }}
            >
              <div className={cn('Header')}>
                <IconButton
                  className={cn('Back')}
                  icon={'arrow-left'}
                  fill={'oldAsphalt50'}
                  onClick={handleCloseFriends}
                />
                <Switcher
                  currentValue={filterFriends}
                  onChange={handleFriendsSwitch}
                  options={FRIENDS_SWITCH}
                />
              </div>
              <div className={cn('FriendsContainer')}>
                {anyUsersNotFriends?.length && (
                  <>
                    <Text className={cn('Title')} size={'1'} children={'Сообщения от иных пользователей'} />
                    {anyUsersNotFriends
                    .map((friend) => (
                      <Friend
                        key={friend.id}
                        friend={friend}
                        friendMessageCount={
                          anyUsersMessages.filter(({ dateSeen }) => !Boolean(dateSeen)).length
                        }
                        onOpenChat={handleOpenChat}
                      />
                    ))}
                    <Line />
                    <Text className={cn('Title')} size={'1'} children={'Друзья'} />
                  </>
                )}
                {friends
                .map((friend) => (
                  <Friend
                    key={friend.id}
                    friend={friend}
                    friendMessageCount={
                      friendsMessages.filter(({ dateSeen }) => !Boolean(dateSeen)).length
                    }
                    onOpenChat={handleOpenChat}
                  />
                ))}
              </div>
            </motion.div>
            <span className={cn('Bck')} />
          </>
        )
      }
    </AnimatePresence>
  )
})
