import React, { useMemo } from 'react'
import { makeCn } from '@shared/utils'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import { Title } from '@shared/components/Title'
import { Section } from '@shared/components/Section'
import { useScreenWidth } from '@shared/hooks'
import { MediaQueries } from '~client/modules/cosmo/types/mediaQueries'

import { section } from '~client/modules/cosmo/moduleGeneralCN'
import styles from './Articles.module.scss'
const cn = makeCn('Articles', styles)

SwiperCore.use([Navigation])

const ARTICLES = [
  {
    id: 1,
    title: 'wedwed',
    article: ''
  },
  {
    id: 2,
    title: 'wedwed',
    article: ''
  },
  {
    id: 3,
    title: 'wedwed',
    article: ''
  },
  {
    id: 4,
    title: 'wedwed',
    article: ''
  },
  {
    id: 5,
    title: 'wedwed',
    article: ''
  }
]

type ArticlesType = {}

export const Articles: React.FC<ArticlesType> = () => {
  const screenWidth = useScreenWidth()

  const sliderMediaParam = useMemo(() => {
    return ({
      slidesPerView: Math.round(screenWidth / 450),
      spaceBetween: 30
    })
  }, [screenWidth])

  return (
    <Section className={section()} noPaddingRight={screenWidth > MediaQueries.M_768}>
      <div className={cn()}>
        <div className={cn('Title')}>Статьи</div>
        <Swiper
          className={cn('Slider')}
          navigation
          {...sliderMediaParam}
        >
          {
            ARTICLES.map(({ id, title }) => (
              <SwiperSlide key={id} className={cn('Slide')}>
                <div className={cn('Item')}>
                  <div className={cn('ItemImg')}>img</div>
                  <div className={cn('ItemTitle')}>{title}</div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </Section>
  )
}
