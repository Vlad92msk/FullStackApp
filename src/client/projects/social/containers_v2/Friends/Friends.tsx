import React, { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client/shared/utils'
import { Text } from '@client/shared/components/Text'
import { IconButton } from '@client/shared/components/IconButton'
import { Friend, UserStatus } from '@client/projects/social/containers_v2/Friends/components/Friend/Friend'
import { FRIENDS } from '@client/projects/social/containers_v2/Friends/data/friends'
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

export const Friends: React.FC<FriendsType> = React.memo(({ isOpenFriends, handleCloseFriends, handleOpenChat }) => {
  const [filterFriends, setFilterFriends] = useState<FILTER_FRIENDS>(FILTER_FRIENDS.MY_FRIENDS)
  const handleFriendsSwitch = useCallback((el: React.SyntheticEvent<HTMLInputElement>) => {
      // @ts-ignore
      setFilterFriends(el.target.id)
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
                <div className={cn('Filters')}>
                  <div className={cn('FiltersSwitcher')}>
                    <div style={{
                      display: 'flex',
                      overflow: 'hidden',
                      borderRadius: '15px',
                      width: 'fit-content',
                      border: '1px solid #6c738b'
                    }}>
                      <input
                        className={cn('RadioInput')}
                        onChange={handleFriendsSwitch}
                        type={'radio'}
                        value={FILTER_FRIENDS.MY_FRIENDS}
                        name={'friendsSwitch'}
                        id={FILTER_FRIENDS.MY_FRIENDS}
                        checked={filterFriends === FILTER_FRIENDS.MY_FRIENDS}
                      />
                      <label htmlFor={FILTER_FRIENDS.MY_FRIENDS}>
                        <Text className={cn('RadioLabel')} size={'1'} children={'мои'} />
                      </label>

                      <input
                        className={cn('RadioInput')}
                        onChange={handleFriendsSwitch}
                        type={'radio'}
                        value={FILTER_FRIENDS.POSSIBLE}
                        name={'friendsSwitch'}
                        id={FILTER_FRIENDS.POSSIBLE}
                        checked={filterFriends === FILTER_FRIENDS.POSSIBLE}
                      />
                      <label htmlFor={FILTER_FRIENDS.POSSIBLE}>
                        <Text className={cn('RadioLabel')} size={'1'} children={'возможные'} />
                      </label>

                      <input
                        className={cn('RadioInput')}
                        onChange={handleFriendsSwitch}
                        type={'radio'}
                        value={FILTER_FRIENDS.SEARCH}
                        name={'friendsSwitch'}
                        id={FILTER_FRIENDS.SEARCH}
                        checked={filterFriends === FILTER_FRIENDS.SEARCH}
                      />
                      <label htmlFor={FILTER_FRIENDS.SEARCH}>
                        <Text className={cn('RadioLabel')} size={'1'} children={'найти'} />
                      </label>
                    </div>
                  </div>
                </div>
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
