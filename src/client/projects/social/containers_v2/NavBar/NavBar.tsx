import React from 'react'
import { useRouter } from 'next/router'

import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client/shared/components/ButtonBox'
import { useRouterPush } from '@client/shared/hooks/useRouterPush'
import { ROUTES_ALL } from '@client/projects/routesAll'
import styles from './NavBar.module.scss'

const cn = makeCn('NavBar', styles)

export const USER_ID = 1
export const NavBar: React.FC = React.memo(() => {
  const { query: { layout } } = useRouter()
  const handleGoProfile = useRouterPush(`${ ROUTES_ALL.SOCIAL }/${USER_ID}`)
  const handleGoPhoto = useRouterPush(`${ ROUTES_ALL.SOCIAL }/${USER_ID}/${ROUTES_ALL.SOCIAL_PHOTO}`)
  const handleGoVideo = useRouterPush(`${ ROUTES_ALL.SOCIAL }/${USER_ID}/${ROUTES_ALL.SOCIAL_VIDEO}`)

  return (
    <section className={cn()}>
      <nav className={cn('Nav')}>
        <ul>
          <li>
            <ButtonBox onClick={handleGoProfile}>
              <Icon className={cn('Icon')} size={'ordinary'} icon={'person'} />
              <Text className={cn('Text')} weight={layout === 'profile' ? 'medium' : 'regular'} children={'Профиль'} />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={handleGoPhoto}>
              <Icon className={cn('Icon')} size={'ordinary'} icon={'photo'} />
              <Text className={cn('Text')} weight={layout === 'photo' ? 'medium' : 'regular'} children={'Фото'} />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={handleGoVideo}>
              <Icon className={cn('Icon')} size={'ordinary'} icon={'video'} />
              <Text className={cn('Text')} weight={layout === 'video' ? 'medium' : 'regular'} children={'Видео'} />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={() => console.log('1', 1)}>
              <Icon className={cn('Icon')} size={'ordinary'} icon={'groups'} />
              <Text className={cn('Text')} weight={layout === 'groups' ? 'medium' : 'regular'} children={'Группы'} />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={() => console.log('1', 1)}>
              <Icon className={cn('Icon')} size={'ordinary'} icon={'music'} />
              <Text className={cn('Text')} weight={layout === 'music' ? 'medium' : 'regular'} children={'Музыка'} />
            </ButtonBox>
          </li>
        </ul>
      </nav>
    </section>
  )
}, (a, b)=> a !== b)
