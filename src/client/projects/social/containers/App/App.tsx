import React from 'react'

import { Section } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import { MessageService } from '../Messages/service'
import { UserMenuContextProvider } from '../UserMenu/context/UserMenuContextProvider'
import { NavBar } from '../NavBar'
import { UserMenu } from '../UserMenu'
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
        <UserMenuContextProvider>
          <UserMenu />
        </UserMenuContextProvider>
        {children}
        <NavBar pathname={pathname} />
      </Section>
      <MessageService />
    </>
  )
}, (a, b) => a.pathname === b.pathname)
