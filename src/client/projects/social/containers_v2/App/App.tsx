import React from 'react'

import { Section } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import { NavBar } from '../NavBar'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)

export const App: React.FC = ({ children }) => {

  return (
    <Section className={cn()} bcgImg={{
      path: {
        img: 'bkg',
        project: 'social'
      }
    }}>
      <div className={cn('Content')}>{children}</div>
      <NavBar />
    </Section>
  )
}
