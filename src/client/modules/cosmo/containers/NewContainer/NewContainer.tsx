import React from 'react'
import { NewComponent } from './components'

import { makeCn } from '@shared/utils'
import styles from './NewContainer.module.scss'
const cn = makeCn('NewContainer', styles)


export const NewContainer: React.FC = () => {

  return (
    <section className={cn()}>
      <NewComponent />
    </section>
  )
}
