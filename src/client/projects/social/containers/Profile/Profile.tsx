import React from 'react'

import { makeCn } from '@client_shared/utils'

import styles from './Profile.module.scss'
import { IconButton } from '@client/shared/components/IconButton'
import { Text } from '@client/shared/components/Text'

const cn = makeCn('Profile', styles)


export const Profile: React.FC = () => {

  return (
    <div className={cn()}>
      Profile
    </div>
  )
}
