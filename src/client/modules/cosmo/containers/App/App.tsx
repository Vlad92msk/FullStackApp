import React, { useMemo, useState } from 'react'
import { makeCn } from '@shared/utils'

import styles from './App.module.scss'

const cn = makeCn('Application', styles)


export const App = () => {
  return (
    <div className={cn()}>
      <div>Cosmo</div>
    </div>
  )
}
