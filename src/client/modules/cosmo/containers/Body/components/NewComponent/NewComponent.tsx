import React from 'react'
import { makeCn } from '@shared/utils'

import styles from './NewComponent.module.scss'


const cn = makeCn('NewComponent', styles)


export const NewComponent: React.FC = () => {

  return (
    <div className={cn('NewComponent')}>NewComponent</div>
  )
}
