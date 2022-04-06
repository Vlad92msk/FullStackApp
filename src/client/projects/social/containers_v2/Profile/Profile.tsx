import React from 'react'

import { makeCn } from '@client_shared/utils'
import { UserMenu } from '../UserMenu'
import { UserContent } from '../UserContent'
import styles from './Profile.module.scss'

const cn = makeCn('Profile', styles)

export const Profile = () => {

  return (
    <>
      <UserContent />
    </>
  )
}
