import React from 'react'

import { Section } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import { ServiceMessage } from '../Messages/service'
import { ServiceUserMenu } from '../UserMenu/service'
import { NavBar } from '../NavBar'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)
type AppType = {
  pathname: string
}
export const App: React.FC<AppType> = React.memo(({ children, pathname }) => {

  return (
    <>
      <Section
        className={cn()}
        noPaddingRight
        bcgImg={{
          path: {
            img: 'bkg',
            project: 'social'
          }
        }}>
        <div className={cn('Gap')} />
        <ServiceUserMenu />
        {children}
        <NavBar pathname={pathname} />
      </Section>
      <ServiceMessage />
    </>
  )
}, (a, b) => a.pathname === b.pathname)
