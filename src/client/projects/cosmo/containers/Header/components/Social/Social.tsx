import React, { useCallback, useState } from 'react'
import ReactTooltip from 'react-tooltip'

import { SpeedDailElement } from '@client_shared/components/SpeedDial/types/speedDailElement'
import { SpeedDail } from '@client_shared/components/SpeedDial/SpeedDial'
import { SocialType } from '../../components/Social/types/social'
import { makeCn } from '@client_shared/utils'

import styles from './Social.module.scss'

export const cn = makeCn('Social', styles)


const socialLinks: SpeedDailElement[] = [
  {
    element: (
      <>
        <a
          className={cn('SocialLink')}
          href='https://telega.at/kosmo_off'
          data-for='Telegram'
          data-tip
        >
          <img alt='Telegram' src='https://img.icons8.com/fluent/2x/telegram-app.png' />
        </a>
        <ReactTooltip id={'Telegram'} type={'dark'} place={'bottom'}>
          Telegram
        </ReactTooltip>
      </>
    ),
    id: 1
  },
  {
    element: (
      <>
        <a
          className={cn('SocialLink')}
          href='https://www.youtube.com/channel/UChfeK9NHpgHrO-4384Q9NjQ?sub_confirmation=1'
          data-for='YouTube'
          data-tip
        >
          <img
            alt='YouTube'
            src='https://img.icons8.com/flat_round/2x/youtube-play.png'
          />
        </a>
        <ReactTooltip id={'YouTube'} type={'dark'} place={'bottom'}>
          YouTube
        </ReactTooltip>
      </>
    ),
    id: 2
  },
  {
    element: (
      <>
        <a
          className={cn('SocialLink')}
          href='https://instagram.com/off_kosmo'
          data-for='Instagram'
          data-tip
        >
          <img
            alt='Instagram'
            src='https://img.icons8.com/fluent/2x/instagram-new.png'
          />
        </a>
        <ReactTooltip id={'Instagram'} type={'dark'} place={'bottom'}>
          Instagram
        </ReactTooltip>
      </>
    ),
    id: 3
  },
  {
    element: (
      <>
        <a
          className={cn('SocialLink')}
          href='https://vk.com/kosmo_official'
          data-for='Vk'
          data-tip
        >
          <img
            alt=''
            src='https://img.icons8.com/color/2x/vk-circled.png'
          />
        </a>
        <ReactTooltip id={'Vk'} type={'dark'} place={'bottom'}>
          Vk
        </ReactTooltip>
      </>
    ),
    id: 4
  }
]


export const Social: React.FC<SocialType> = React.memo(() => {
  const [open, handleOpen] = useState(false)

  const handleChangeSocial = useCallback(() => {
    handleOpen(prev => !prev)
  }, [])

  return (
    <div className={cn()}>
      <SpeedDail elements={socialLinks} />
    </div>
  )
})
