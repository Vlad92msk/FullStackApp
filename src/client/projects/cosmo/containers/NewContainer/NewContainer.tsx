import React from 'react'

import { makeCn } from '@client_shared/utils'
import { NewComponent } from './components'

import styles from './NewContainer.module.scss'
const cn = makeCn('NewContainer', styles)


export const NewContainer: React.FC = () => {

  return (
    <section className={cn()}>
      <NewComponent />
    </section>
  )
}
