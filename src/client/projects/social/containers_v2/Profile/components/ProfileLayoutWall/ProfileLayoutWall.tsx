import React, { useCallback, useState } from 'react'
import { makeCn } from '@client_shared/utils'
import styles from './ProfileLayoutWall.module.scss'


const cn = makeCn('ProfileLayoutWall', styles)

type ProfileLayoutWallType = {
  userId: number
}

/**
 * Раздел Профиля - Контент-компонет для Видео или Фото
 */
export const ProfileLayoutWall: React.FC<ProfileLayoutWallType> = React.memo((props) => {
  const { userId } = props


  return (
    <div className={cn()}>
      wall
    </div>
  )
})
