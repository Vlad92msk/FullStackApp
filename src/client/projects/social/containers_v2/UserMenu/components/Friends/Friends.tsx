import React, { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Icon } from '@client_shared/components/Icon'
import { UserSmall } from '@client/projects/social/components'
import styles from './Friends.module.scss'
import { IconButton } from '@client/shared/components/IconButton'

const cn = makeCn('Friends', styles)

export type FriendsType = {
  isOpenFriends: boolean
  handleCloseFriends: () => void
  handleOpenChat: () => void
}

export enum FILTER_FRIENDS {
  MY_FRIENDS = 'myFriends',
  POSSIBLE = 'possible',
  SEARCH = 'search'
}

export const Friends: React.FC<FriendsType> = React.memo(({ isOpenFriends, handleCloseFriends, handleOpenChat }) => {
  const [filterFriends, setFilterFriends] = useState<FILTER_FRIENDS>(FILTER_FRIENDS.MY_FRIENDS)
  const changeLang = useCallback((lang: React.SyntheticEvent<HTMLInputElement>) => {
      // @ts-ignore
      setFilterFriends(lang.target.id)
    }
    , [])
  return (
    <AnimatePresence exitBeforeEnter>
      {
        isOpenFriends && (
          <motion.div
            className={cn()}
            initial={{ left: '0%' }}
            animate={{ left: '100%' }}
            exit={{ left: '0%' }}
            transition={{ duration: 1, power: 20 }}
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
                      onChange={changeLang}
                      type={'radio'}
                      value={FILTER_FRIENDS.MY_FRIENDS}
                      name={'groups'}
                      id={FILTER_FRIENDS.MY_FRIENDS}
                      checked={filterFriends === FILTER_FRIENDS.MY_FRIENDS}
                    />
                    <label htmlFor={FILTER_FRIENDS.MY_FRIENDS}>
                      <Text className={cn('RadioLabel')} size={'1'} children={'мои'} />
                    </label>

                    <input
                      className={cn('RadioInput')}
                      onChange={changeLang}
                      type={'radio'}
                      value={FILTER_FRIENDS.POSSIBLE}
                      name={'groups'}
                      id={FILTER_FRIENDS.POSSIBLE}
                      checked={filterFriends === FILTER_FRIENDS.POSSIBLE}
                    />
                    <label htmlFor={FILTER_FRIENDS.POSSIBLE}>
                      <Text className={cn('RadioLabel')} size={'1'} children={'возможные'} />
                    </label>

                    <input
                      className={cn('RadioInput')}
                      onChange={changeLang}
                      type={'radio'}
                      value={FILTER_FRIENDS.SEARCH}
                      name={'groups'}
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
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
              <div className={cn('FriendsRow')}>
                <UserSmall
                  img={'ava'}
                  className={cn('UserImgName')}
                  textClassName={cn('FriendsUserName')}
                  userName={'ОченьДлинноеИмяОченьДлинноеИмяОченьДлинноеИмя ОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилияОченьДлинноеФамилия'}
                />
                <div className={cn('MassageStatus')}>
                  <Text className={cn('ButtonMassage')} size={'1'} onClick={handleOpenChat}>
                    <Icon className={cn('ButtonMassageIcon')} size={'small'} icon={'message-square'} />
                    200
                  </Text>
                  <span className={cn('FriendsStatus', { status: 'online' })} />
                </div>
              </div>
            </div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
})
