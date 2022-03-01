import React from 'react'

import { makeCn } from '@client_shared/utils'
import { Image } from '@client_shared/components/Image'

import styles from './Person.module.scss'
const cn = makeCn('Person', styles)

export const Person: React.FC = () => (
  <div className={cn()}>
    <Image sizePriority={'contain'} path={{
      img: 'person',
      project: 'portfolio'
    }} />
  </div>
)

