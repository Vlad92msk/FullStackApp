import React from 'react'

import { Section } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { NavBar } from '../NavBar'
import { UserMenu } from '../UserMenu'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)
type AppType = {
  pathname: string
}
export const App: React.FC<AppType> = React.memo(({ children, pathname }) => {
  return (
    <Section noPaddingRight className={cn()} bcgImg={{
      path: {
        img: 'bkg',
        project: 'social'
      }
    }}>
      <div className={cn('Gap')} />
      <UserMenu />
      {children}
      <NavBar pathname={pathname} />
      <ButtonBox className={cn('Chat')}>
        <Icon className={cn('ChatIcon')} icon={'message-square'} size={'ordinary'} />
        <Text className={cn('ChatCount')} children={null} size={'7'} />
      </ButtonBox>
    </Section>
  )
}, (a, b) => a.pathname === b.pathname)
