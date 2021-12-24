import React from 'react'
import { makeCn } from '@shared/utils'
import { Section } from '@shared/components/Section'
import { classnames } from '@bem-react/classnames'

import { section } from '~client/projects/cosmo/moduleGeneralCN'
import styles from './Footer.module.scss'
const footer = makeCn('Footer', styles)


export const Footer: React.FC = () => (
  <Section
    className={classnames(section(), footer())}
    noPaddingLeft noPaddingRight
    bcgImg={{
      path:{ project: 'cosmo', img: 'footer' },
    }}
  />
)
