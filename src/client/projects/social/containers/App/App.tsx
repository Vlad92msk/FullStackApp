import React from 'react'

import { Section } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import { MessageContextProvider } from '../Messages/context/MessageContextProvider'
import { UserMenuContextProvider } from '../UserMenu/context/UserMenuContextProvider'
import { NavBar } from '../NavBar'
import { UserMenu } from '../UserMenu'
import { Messages } from '../Messages'
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
      <MessageContextProvider>
        <Messages />
      </MessageContextProvider>
    </>
  )
}, (a, b) => a.pathname === b.pathname)
