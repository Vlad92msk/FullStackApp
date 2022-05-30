import React from 'react'

import { makeCn } from '@client_shared/utils'
import { useBooleanState } from '@client_shared/hooks'
import { StatisticButton } from '../../components'
import styles from './ButtonHashes.module.scss'

const cn = makeCn('ButtonHashes', styles)

type ButtonHashesProps = {}
export const ButtonHashes: React.FC<ButtonHashesProps> = (props) => {
  const [isOpen, setOpen, setClose] = useBooleanState(false)

  return (
    <>
      <StatisticButton
        text={'Отметок'}
        onOpen={setOpen}
        icon={'hash'}
        count={300}
      />
    </>
  )
}
