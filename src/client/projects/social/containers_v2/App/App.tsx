import React from 'react'

import { Section } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import { NavBar } from '../NavBar'
import { UserMenu } from '../UserMenu'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)

export const App: React.FC = ({ children }) => {

  return (
    <Section noPaddingRight className={cn()} bcgImg={{
      path: {
        img: 'bkg',
        project: 'social'
      }
    }}>
      <UserMenu />
      {children}
      <NavBar />
    </Section>
  )
}
