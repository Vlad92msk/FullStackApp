import React from 'react'

import { Section } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import { Header } from '../Header'
import { NavBar } from '../NavBar'
import { UserMenu } from '../UserMenu'
import { Profile } from '../Profile'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)

export const App = () => {

  return (
    <Section className={cn()} bcgImg={{
      path: {
        img: 'bkg',
        project: 'social'
      }
    }}>
      <Header />
      <div className={cn('Main')}>
        <NavBar />
        <div className={cn('Content')}>
          <Profile />
        </div>
        <UserMenu />
      </div>
    </Section>
  )
}
