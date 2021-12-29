import React from 'react'
import { makeCn } from '@shared/utils'
import styles from './Person.module.scss'
import { Image } from '@shared/components/Image'

const cn = makeCn('Person', styles)

export const Person: React.FC = () => (
  <div className={cn()}>
    <Image sizePriority={'contain'} path={{
      img: 'person',
      project: 'portfolio'
    }} />
  </div>
)

