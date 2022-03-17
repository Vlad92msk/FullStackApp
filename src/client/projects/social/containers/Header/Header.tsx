import React from 'react'

import { makeCn } from '@client_shared/utils'

import styles from './Header.module.scss'
import { IconButton } from '@client/shared/components/IconButton'
import { Text } from '@client/shared/components/Text'

const cn = makeCn('Header', styles)


export const Header: React.FC = () => {

  return (
    <div className={cn()}>
      <div className={cn('AppsSwitch')}>S</div>
      <span className={cn('Gap')}/>
      <div className={cn('Main')}>
        <IconButton icon={'bell'}  fill={'oldAsphalt50'} />
        <span className={cn('GapMin')}/>
        <div className={cn('User')}>
          <div className={cn('UserPhoto')}>O</div>
          <Text className={cn('UserName')} children={'Firsov Vlad'} />
        </div>
      </div>
    </div>
  )
}
