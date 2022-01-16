import React from 'react'
import { classnames } from '@bem-react/classnames'

import { makeCn } from '@shared/utils'
import { Section } from '@shared/components/Section'
import { WriteText } from '@shared/components/WriteText'
import { ResponseApi } from '@shared/components/ResponseApi'
import { Image } from '@shared/components/Image'

import { useCosmoInterfaceQuery } from '~client/projects/gql-generated-hooks'
import { section } from '~client/projects/cosmo/moduleGeneralCN'
import { Social } from './components/Social'
import styles from './Header.module.scss'

const header = makeCn('Header', styles)


export const Header: React.FC = () => {
  const {
    data: { userInterfaceCosmoFindAll: userInterface } = {},
    loading, error
  } = useCosmoInterfaceQuery()

  return (
    <Section className={classnames(section(), header())}>
      <ResponseApi status={[loading]} errors={[error]}>
        {() => <>
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
                <WriteText myText={userInterface.firstSpace} repeatCount={1} />
              </div>
            </div>
          </div>
        </>}
      </ResponseApi>
    </Section>
  )
}
