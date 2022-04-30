import React from 'react'

import { Section } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import { NavBar } from '../NavBar'
import { UserMenu } from '../UserMenu'
import styles from './App.module.scss'
import { IconButton } from '@client/shared/components/IconButton'
import { Text } from '@client/shared/components/Text'
import { ButtonBox } from '@client/shared/components/ButtonBox'
import { Icon } from '@client/shared/components/Icon'

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
        <Text className={cn('ChatCount')} children={null} size={'7'}/>
      </ButtonBox>
    </Section>
  )
})
