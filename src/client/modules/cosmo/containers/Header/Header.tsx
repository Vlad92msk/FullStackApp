import React from 'react'
import { makeCn } from '@shared/utils'

import { IconButton } from '@shared/components/IconButton'
import { Title } from '@shared/components/Title'
import { useWriteText } from '@shared/hooks'
import { Social } from './components/Social'

import styles from './Header.module.scss'
const cn = makeCn('Header', styles)


export const Header: React.FC = () => {
const description = useWriteText({
  myText: 'Первый космический',
  repeatCount: 1
})

  return (
    <header className={cn()}>
      <video muted autoPlay loop
             className={cn('Video')}
             src={'/resources/videos/vid.mp4'}
      />
      <Social />

      <div className={cn('Main')}>
        <img className={cn('Img')} src={'/resources/images/cosmo/cosmo.png'} />
        <div className={cn('TitleBox')}>
          <div className={cn('Title')}>Cosmo</div>
          <div className={cn('Description')}>{description}</div>
        </div>
      </div>

      <div className={cn('Bottom')}>
        <IconButton
          icon={'arrow-down-sharp'}
          size={'medium'}
          fill={'light100'}
          onClick={event => console.log('1', 1)}
        />
      </div>
    </header>
  )
}
