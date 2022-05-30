import React from 'react'

import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { UserInfo } from '../../../UserMenu/components'
import { UserType } from '../../../App/data/user'
import styles from './ProfileLayoutAboutMe.module.scss'

const cn = makeCn('ProfileLayoutAboutMe', styles)


export type ProfileLayoutAboutMeProps = {
  userInfo: UserType
}

export const ProfileLayoutAboutMe: React.FC<ProfileLayoutAboutMeProps> = (props) => {
  const { userInfo } = props
  const { family, name, hashName, description, baseInformation, professionalInformation } = userInfo
  return (
    <div className={cn()}>
      <Text className={cn('Description')} children={description} />
      <UserInfo
        baseInformation={baseInformation}
        professionalInformation={professionalInformation}
      />
    </div>
  )
}
