import React from 'react'
import { Image } from '@client/shared/components/Image'
import { Text } from '@client/shared/components/Text'
import { makeCn } from '@client/shared/utils'
import styles from './UserSmall.module.scss'
import { classnames } from '@bem-react/classnames'

const cn = makeCn('UserSmall', styles)

export type UserSmallType = {
  className?: string
  textClassName?: string
  userName: string
  img: string
}

export const UserSmall: React.FC<UserSmallType> = React.memo(({ className, textClassName, userName, img }) => {
  return (
    <div className={classnames(className, cn())}>
      <div className={cn('Img')}>
        <Image path={{
          img,
          project: 'social'
        }} />
      </div>
      <Text className={classnames(cn('Name'), textClassName)} children={userName} size={'1'} />
    </div>
  )
})
