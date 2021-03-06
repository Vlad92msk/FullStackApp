import React from 'react'

import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { useReplaceRouterUrl } from '@client_shared/hooks/useRouterPush'
import { SocialPages } from '@client/projects/social/router'
import styles from './NavBar.module.scss'

const cn = makeCn('NavBar', styles)

export const USER_ID = 1

type NavBarType = {
  pathname: string
}
export const NavBar: React.FC<NavBarType> = React.memo(({ pathname }) => {
  const layout = pathname.split('/')[4] as SocialPages
  const [handleGoProfile] = useReplaceRouterUrl(layout, SocialPages.SOCIAL_PROFILE)
  const [handleGoPhoto] = useReplaceRouterUrl(layout, SocialPages.SOCIAL_PHOTO)
  const [handleGoVideo] = useReplaceRouterUrl(layout, SocialPages.SOCIAL_VIDEO)
  const [handleGoGroups] = useReplaceRouterUrl(layout, SocialPages.SOCIAL_GROUPS)
  const [handleGoMusic] = useReplaceRouterUrl(layout, SocialPages.SOCIAL_MUSIC)

  return (
    <section className={cn()}>
      <nav className={cn('Nav')}>
        <ul>
          <li>
            <ButtonBox onClick={handleGoProfile}>
              <Icon
                className={cn('Icon', { active: layout === SocialPages.SOCIAL_PROFILE })}
                size={'medium'}
                icon={'person'}
              />
              <Text
                className={cn('Text', { active: layout === SocialPages.SOCIAL_PROFILE })}
                textTransform={'uppercase'}
                size={'5'}
                children={'Профиль'}
              />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={handleGoPhoto}>
              <Icon
                className={cn('Icon', { active: layout === SocialPages.SOCIAL_PHOTO })}
                size={'medium'}
                icon={'photo'} />
              <Text
                className={cn('Text', { active: layout === SocialPages.SOCIAL_PHOTO })}
                textTransform={'uppercase'}
                size={'5'}
                children={'Фото'}
              />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={handleGoVideo}>
              <Icon
                className={cn('Icon', { active: layout === SocialPages.SOCIAL_VIDEO })}
                size={'medium'}
                icon={'video'}
              />
              <Text
                className={cn('Text', { active: layout === SocialPages.SOCIAL_VIDEO })}
                textTransform={'uppercase'}
                size={'5'}
                children={'Видео'}
              />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={handleGoGroups}>
              <Icon
                className={cn('Icon', { active: layout === SocialPages.SOCIAL_GROUPS })}
                size={'medium'}
                icon={'groups'}
              />
              <Text
                className={cn('Text', { active: layout === SocialPages.SOCIAL_GROUPS })}
                textTransform={'uppercase'}
                size={'5'}
                children={'Группы'}
              />
            </ButtonBox>
          </li>
          <li>
            <ButtonBox onClick={handleGoMusic}>
              <Icon
                className={cn('Icon', { active: layout === SocialPages.SOCIAL_MUSIC })}
                size={'medium'}
                icon={'music'}
              />
              <Text
                className={cn('Text', { active: layout === SocialPages.SOCIAL_MUSIC })}
                textTransform={'uppercase'}
                size={'5'}
                children={'Музыка'}
              />
            </ButtonBox>
          </li>
        </ul>
      </nav>
    </section>
  )
})
