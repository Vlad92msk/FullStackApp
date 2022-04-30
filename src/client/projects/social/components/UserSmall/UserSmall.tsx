import React from 'react'
import { classnames } from '@bem-react/classnames'
import { Image } from '@client_shared/components/Image'
import { Text, TextSize } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import styles from './UserSmall.module.scss'

const cn = makeCn('UserSmall', styles)

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export type UserSmallType = {
  className?: string
  textClassName?: string
  avaClassName?: string
  textSize?: TextSize
  userName: string
  img: string
  status?: UserStatus
}

export const UserSmall: React.FC<UserSmallType> = React.memo((props) => {
  const { className, textClassName, avaClassName, userName, img, textSize, status } = props
  return (
    <div className={classnames(className, cn())}>
      <div className={cn('Box')}>
        <div className={classnames(avaClassName, cn('Img'))}>
          <Image path={{
            img,
            project: 'social'
          }} />
        </div>
        <span className={cn('UserStatus', { status })} />
      </div>
      <Text className={classnames(cn('Name'), textClassName)} children={userName} size={textSize} />
    </div>
  )
})

UserSmall.defaultProps = {
  textSize: '1'
}
