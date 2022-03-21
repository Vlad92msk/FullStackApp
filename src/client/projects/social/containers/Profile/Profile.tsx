import React, { useCallback, useEffect, useState } from 'react'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { MainCard, ProfileCard } from '@client/projects/social/containers/Profile/components'
import styles from './Profile.module.scss'

const cn = makeCn('Profile', styles)


export const Profile: React.FC = React.memo(() => {


  return (
    <div className={cn()}>
      <Text className={cn('Title')} size={'5'} weight={'bold'} textTransform={'uppercase'} children={'Профиль'} />
      <div className={cn('Container')}>

        <ProfileCard name={'photo'} title={'Фото'}>
          <MainCard
            description={'В пресс-службе Росгвардии заявили, что российские подразделения в\n' +
            '        ходе операции в городе Изюм в Харьковской области взяли в плен нескольких лидеров националистических\n' +
            '        формирований и пособников Службы безопасности Украин'}
            title={'tittle'} date={'июль 02, 2002'} authorName={'Фамилия Имя'}
          />
          <MainCard title={'tittle'} date={'июль 02, 2002'} authorName={'Фамилия Имя'} />
          <MainCard description={'dwed'} title={'tittle'} date={'июль 02, 2002'} authorName={'Фамилия Имя'} />
          <MainCard title={'tittle'} date={'июль 02, 2002'} />
          <MainCard title={'tittle'} date={'июль 02, 2002'} />
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
