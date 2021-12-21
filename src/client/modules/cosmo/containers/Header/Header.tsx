import React from 'react'
import { classnames } from '@bem-react/classnames'

import { makeCn } from '@shared/utils'
import { IconButton } from '@shared/components/IconButton'
import { Title } from '@shared/components/Title'
import { Section } from '@shared/components/Section'
import { WriteText } from '@shared/components/WriteText'
import { Social } from './components/Social'

import styles from './Header.module.scss'
import { section } from '~client/modules/cosmo/moduleGeneralCN'
import { Image } from '@shared/components/Image'

const header = makeCn('Header', styles)


export const Header: React.FC = () => {

  return (
    <Section className={classnames(section(), header())}>
      <video muted autoPlay loop
             className={header('Video')}
             src={'/resources/videos/vid.mp4'}
      />
      <Social />

      <div className={header('Main')}>
        <div className={header('Img')}>
          <Image sizePriority={'contain'} path={{ project: 'cosmo', img: 'cosmo' }} />
        </div>
        <div className={header('TitleBox')}>
          <div className={header('Title')}>Cosmo</div>
          <div className={header('Description')}>
            <WriteText myText={'Первый космический'} repeatCount={1} />
          </div>
        </div>
      </div>

      <div className={header('Bottom')}>
        <IconButton
          icon={'arrow-down-sharp'}
          size={'medium'}
          fill={'light100'}
          onClick={event => console.log('1', 1)}
        />
      </div>
    </Section>
  )
}