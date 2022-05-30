import React, { useCallback } from 'react'

import { makeCn } from '@client_shared/utils'
import { useBooleanState } from '@client_shared/hooks'
import { UserSmall } from '@client/projects/social/components'
import { useServiceUserMenuSelector } from '@client/projects/social/containers/UserMenu/service'
import { StatisticButton } from '@client/projects/social/containers/UserMenu/components'
import { NavigationDrawer } from '@client/shared/components/NavigationDrawer'
import styles from './StatisticButtons.module.scss'

const cn = makeCn('ButtonContacts', styles)

type ButtonContactsProps = {}
export const ButtonContacts: React.FC<ButtonContactsProps> = (props) => {
  const friends = useServiceUserMenuSelector('friends')
  const [isOpen, setOpen, setClose] = useBooleanState(false)


  return (
    <>
      <StatisticButton
        text={'Контактов'}
        onOpen={setOpen}
        icon={'friends'}
        count={friends?.length || 0}
      />
      <NavigationDrawer
        isOpen={isOpen}
        onClose={setClose}
        className={cn('Friends')}
      >
        {friends?.map(({ id, name, family, img, status }) => (
          <div key={id} className={cn('UserStatus')}>
            <UserSmall img={img} userName={name + family} status={status} />
          </div>
        ))}
      </NavigationDrawer>
    </>
  )
}
