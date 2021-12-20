import React from 'react'

import { makeCn } from '@shared/utils'
import { Section } from '@shared/components/Section'

import styles from './Footer.module.scss'
import { classnames } from '@bem-react/classnames'

import { section } from '~client/modules/cosmo/moduleGeneralCN'
const footer = makeCn('Footer', styles)

export const Footer: React.FC = () => (
  <Section
    className={classnames(section(), footer())}
    bcgImg={{ project: 'cosmo', imgName: 'footer.jpg' }}
  />
)
