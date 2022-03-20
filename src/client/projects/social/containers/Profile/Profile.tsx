import React, { useCallback, useEffect, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { ProfileCard } from '@client/projects/social/containers/Profile/components'
import styles from './Profile.module.scss'

const cn = makeCn('Profile', styles)


export const Profile: React.FC = React.memo(() => {


  return (
    <div className={cn()}>
      <Text className={cn('Title')} size={'5'} weight={'bold'} textTransform={'uppercase'} children={'Профиль'} />
      <div className={cn('Container')}>

        <ProfileCard name={'photo'} title={'Фото'}>
          <div>photo</div>
        </ProfileCard>

        <ProfileCard name={'video'} title={'Видео'}>
          <div>Видео</div>
        </ProfileCard>

        <ProfileCard name={'ribbon'} title={'Лента'}>
          <div>Лента</div>
        </ProfileCard>

        <ProfileCard name={'articles'} title={'Статьи'}>
          <div>Статьи</div>
        </ProfileCard>

        <ProfileCard name={'job'} title={'Работа'}>
          <div>Работа</div>
        </ProfileCard>

        <ProfileCard name={'mentor'} title={'Менторство'}>
          <div>Менторство</div>
        </ProfileCard>

      </div>
    </div>
  )
})
