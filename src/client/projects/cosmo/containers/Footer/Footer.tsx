import React from 'react'
import { classnames } from '@bem-react/classnames'

import { makeCn } from '@client_shared/utils'
import { Section } from '@client_shared/components/Section'
import { section } from '@client_projects/cosmo/moduleGeneralCN'

import styles from './Footer.module.scss'
const footer = makeCn('Footer', styles)


export const Footer: React.FC = () => (
  <Section
    className={classnames(section(), footer())}
    noPaddingLeft noPaddingRight
    bcgImg={{
      path:{ project: 'cosmo', img: 'footer' },
    }}
  >
    <span style={{height: 'inherit'}} />
  </Section>
)
