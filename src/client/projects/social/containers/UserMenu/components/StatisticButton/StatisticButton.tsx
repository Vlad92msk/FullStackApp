import React from 'react'

import { makeCn } from '@client_shared/utils'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { IconName } from '@client/public/models/icon.model'
import styles from './StatisticButton.module.scss'

const cn = makeCn('StatisticButton', styles)

type StatisticButtonsProps = {
  text: string
  count: number
  onOpen: () => void
  icon: IconName
}
export const StatisticButton: React.FC<StatisticButtonsProps> = (props) => {
  const { count, text, onOpen, icon } = props

  return (
    <ButtonBox className={cn('ButtonTextBox')} onClick={onOpen}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={icon} />
        <Text children={count} size={'8'} />
      </div>
      <Text children={text} />
    </ButtonBox>
  )
}
