import React from 'react'
import { NewComponent } from './components/NewComponent'

import { makeCn } from '@shared/utils'
import styles from './Body.module.scss'
const cn = makeCn('Body', styles)


export const Body: React.FC = () => {

  return (
    <section className={cn()}>
      <NewComponent />
    </section>
  )
}
