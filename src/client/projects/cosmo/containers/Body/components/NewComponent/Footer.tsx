import React from 'react'
import { makeCn } from '@client_shared/utils'

import styles from './NewComponent.module.scss'
const cn = makeCn('NewComponent', styles)


export const Footer: React.FC = () => {

  return (
    <div className={cn('NewComponent')}>NewComponent</div>
  )
}
