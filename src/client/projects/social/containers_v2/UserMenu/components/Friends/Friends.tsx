import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Icon } from '@client_shared/components/Icon'
import { UserSmall } from '@client/projects/social/components'
import styles from './Friends.module.scss'

const cn = makeCn('Friends', styles)

export type FriendsType = {
  isOpenFriends: boolean
  handleCloseFriends: () => void
  handleOpenChat: () => void
}

export const Friends: React.FC<FriendsType> = React.memo(({ isOpenFriends, handleCloseFriends, handleOpenChat }) => {

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
              <div className={cn('Back')} onClick={handleCloseFriends}>back</div>
              <div className={cn('Filters')}>
                <div className={cn('Filter')}>Filter</div>
                <div className={cn('Filter')}>Filter</div>
                <div className={cn('Filter')}>Filter</div>
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
