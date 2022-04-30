import React, { useCallback } from 'react'

import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { Popup } from '@client_shared/components/Popup'
import { useAnchorElState, useBooleanState } from '@client_shared/hooks'
import { UserSmall } from '@client/projects/social/components'
import { UserType } from '../../../App/data/user'
import styles from './StatisticButtons.module.scss'

const cn = makeCn('StatisticButtons', styles)

type StatisticButtonsProps = {
  friends: UserType[]
}
export const StatisticButtons: React.FC<StatisticButtonsProps> = React.memo((props) => {
  const { friends } = props
  const [friendsRef, openAnchorFriends, closeAnchorFriends] = useAnchorElState(null)

  /**
   * Флаг открытия инф по хешу
   */
  const [openHash, setOpenHash, onCloseHash] = useBooleanState(false)


  const handleOpenNotifications = useCallback(() => {
    console.log('notification')
  }, [])


  return (
    <>
      <div className={cn()}>
        <ButtonBox className={cn('ButtonTextBox')} onClick={openAnchorFriends}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'friends'} />
            <Text children={friends?.length || 0} size={'8'} />
          </div>
          <Text children={'Контактов'} />
        </ButtonBox>
        <ButtonBox className={cn('ButtonTextBox')} onClick={setOpenHash}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'hash'} />
            <Text children={300} size={'8'} />
          </div>
          <Text children={'Отметок'} />
        </ButtonBox>
        <ButtonBox className={cn('ButtonTextBox')} onClick={handleOpenNotifications}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'notification'} />
            <Text children={10} size={'8'} />
          </div>
          <Text children={'Уведомлений'} />
        </ButtonBox>
      </div>
      <Popup
        className={cn('FriendsPopup')}
        anchorEl={friendsRef}
        open={!!friendsRef}
        onClose={closeAnchorFriends}
        placement={'right'}
      >
        {friends.map(({ id, name, family, img, status }) => (
          <div className={cn('UserStatus')}>
            <UserSmall key={id} img={img} userName={name + family} />
            <span className={cn('UserStatusDot', { status })} />
          </div>
        ))}
      </Popup>
    </>
  )
})
