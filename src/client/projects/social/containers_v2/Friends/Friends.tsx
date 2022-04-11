import React, { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client/shared/utils'
import { IconButton } from '@client/shared/components/IconButton'
import { Friend } from './components/Friend/Friend'
import { FRIENDS } from './data/friends'
import { Switcher, SwitcherOption } from '../../components'
import styles from './Friends.module.scss'

const cn = makeCn('Friends', styles)


export type FriendsType = {
  isOpenFriends: boolean
  handleCloseFriends: () => void
  handleOpenChat: (userId: number) => void
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

export const Friends: React.FC<FriendsType> = React.memo((props) => {
  const { isOpenFriends, handleCloseFriends, handleOpenChat } = props
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
                {FRIENDS.map((friend) => (
                  <Friend
                    key={friend.friendId}
                    friend={friend}
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
