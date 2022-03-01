import React from 'react'
import { classnames } from '@bem-react/classnames'

import { makeCn } from '@client_shared/utils'
import { Section } from '@client_shared/components/Section'
import { WriteText } from '@client_shared/components/WriteText'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { Image } from '@client_shared/components/Image'
import { useCosmoInterfaceQuery } from '@client_projects/gql-generated-hooks'
import { section } from '@client_projects/cosmo/moduleGeneralCN'
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
