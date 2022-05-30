import React, { useCallback } from 'react'

import { makeCn } from '@client_shared/utils'
import { ButtonContacts, ButtonHashes, ButtonNotifications } from '../../components'
import styles from './StatisticBox.module.scss'

const cn = makeCn('StatisticBox', styles)

type StatisticButtonsProps = {}
export const StatisticBox: React.FC<StatisticButtonsProps> = React.memo((props) => {

  return (
    <div className={cn()}>
      <ButtonContacts />
      <ButtonHashes />
      <ButtonNotifications />
    </div>
  )
})
