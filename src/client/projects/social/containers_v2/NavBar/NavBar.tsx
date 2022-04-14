import React from 'react'
import { useRouter } from 'next/router'

import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { replaceUrl, useRouterPush } from '@client_shared/hooks/useRouterPush'
import { SocialPages } from '@client/projects/social/router'
import styles from './NavBar.module.scss'

const cn = makeCn('NavBar', styles)


export const USER_ID = 1
export const NavBar: React.FC = React.memo(() => {
  const { pathname } = useRouter()
  const layout = pathname.split('/')[4] as SocialPages
  const handleGoProfile = useRouterPush(...replaceUrl(pathname, layout, 'user_layout', SocialPages.SOCIAL_PROFILE))
  const handleGoPhoto = useRouterPush(...replaceUrl(pathname, layout, 'user_layout', SocialPages.SOCIAL_PHOTO))
  const handleGoVideo = useRouterPush(...replaceUrl(pathname, layout, 'user_layout', SocialPages.SOCIAL_VIDEO))
  const handleGoGroups = useRouterPush(...replaceUrl(pathname, layout, 'user_layout', SocialPages.SOCIAL_GROUPS))
  const handleGoMusic = useRouterPush(...replaceUrl(pathname, layout, 'user_layout', SocialPages.SOCIAL_MUSIC))

  return (
    <section className={cn()}>
      <nav className={cn('Nav')}>
        <ul>
          <li>
            <ButtonBox onClick={handleGoProfile}>
              <Icon
                className={cn('Icon')}
                size={'ordinary'}
                icon={'person'}
              />
              <Text
                className={cn('Text')}
                weight={layout === SocialPages.SOCIAL_PROFILE ? 'medium' : 'regular'}
                children={'Профиль'}
              />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={handleGoPhoto}>
              <Icon
                className={cn('Icon')}
                size={'ordinary'}
                icon={'photo'} />
              <Text
                className={cn('Text')}
                weight={layout === SocialPages.SOCIAL_PHOTO ? 'medium' : 'regular'}
                children={'Фото'}
              />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={handleGoVideo}>
              <Icon
                className={cn('Icon')}
                size={'ordinary'} icon={'video'}
              />
              <Text
                className={cn('Text')}
                weight={layout === SocialPages.SOCIAL_VIDEO ? 'medium' : 'regular'}
                children={'Видео'}
              />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={handleGoGroups}>
              <Icon
                className={cn('Icon')}
                size={'ordinary'}
                icon={'groups'}
              />
              <Text
                className={cn('Text')}
                weight={layout === SocialPages.SOCIAL_GROUPS ? 'medium' : 'regular'}
                children={'Группы'}
              />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={handleGoMusic}>
              <Icon
                className={cn('Icon')}
                size={'ordinary'} icon={'music'}
              />
              <Text
                className={cn('Text')}
                weight={layout === SocialPages.SOCIAL_MUSIC ? 'medium' : 'regular'}
                children={'Музыка'}
              />
            </ButtonBox>
          </li>
        </ul>
      </nav>
    </section>
  )
})
