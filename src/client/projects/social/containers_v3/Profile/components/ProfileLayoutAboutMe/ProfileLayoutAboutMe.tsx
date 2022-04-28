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
      <div className={cn('UserRow')}>
        <div className={cn('UserFIO')}>
          <Text className={cn('UserName')} size={'8'} weight={'medium'} children={`${family} ${name}`} />
        </div>
        <Text className={cn('Hash')} size={'2'} children={`#${hashName}`} />
      </div>

      <div className={cn('Information')}>
        <Text className={cn('Description')} children={description} />
        <UserInfo
          baseInformation={baseInformation}
          professionalInformation={professionalInformation}
        />
      </div>
    </div>
  )
}
