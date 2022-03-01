import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'

import { socialStyles } from '@client_projects/cosmo/containers/Header/components/Social/materialUI'
import { makeCn } from '@client_shared/utils'
import { useBooleanState } from '@client_shared/hooks'
import { Icon } from '@client_shared/components/Icon'

import styles from './Social.module.scss'
const cn = makeCn('Social', styles)
const useStyles = makeStyles(() => socialStyles)


const socialLinks = [
  {
    icon: (
      <a className={cn('SocialLink')} href='https://vk.com/kosmo_official'>
        <img alt='' src='https://img.icons8.com/color/2x/vk-circled.png' />
      </a>
    ),
    name: 'Vk'
  },
  {
    icon: (
      <a className={cn('SocialLink')} href='https://instagram.com/off_kosmo'>
        <img alt='' src='https://img.icons8.com/fluent/2x/instagram-new.png' />
      </a>
    ),
    name: 'Instagram'
  },
  {
    icon: (
      <a
        className={cn('SocialLink')}
        href='https://www.youtube.com/channel/UChfeK9NHpgHrO-4384Q9NjQ?sub_confirmation=1'
      >
        <img
          alt=''
          src='https://img.icons8.com/flat_round/2x/youtube-play.png'
        />
      </a>
    ),
    name: 'YouTube'
  },
  {
    icon: (
      <a className={cn('SocialLink')} href='https://telega.at/kosmo_off'>
        <img alt='' src='https://img.icons8.com/fluent/2x/telegram-app.png' />
      </a>
    ),
    name: 'Telegram'
  }
]


export const Social: React.FC = () => {
  const { actions, fab, root } = useStyles()
  const [open, handleOpen, handleClose] = useBooleanState(false)

  return (
    <SpeedDial
      ariaLabel='Body'
      icon={<Icon icon={'share'} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction='left'
      classes={{ root, fab, actions }}
    >
      {socialLinks.map((link) => (
        <SpeedDialAction
          key={link.name}
          icon={link.icon}
          tooltipTitle={link.name}
          tooltipPlacement='bottom'
          onClick={handleClose}
          className={cn('SocialButton')}
        />
      ))}
    </SpeedDial>
  )
}
