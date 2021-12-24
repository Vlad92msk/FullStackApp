import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'

import { makeCn } from '@shared/utils'
import { Title } from '@shared/components/Title'
import { Section } from '@shared/components/Section'
import { createString } from '@shared/utils/createString'
import { useScreenWidth } from '@shared/hooks'

import { MediaQueries } from '~public/models/mediaQueries'
import { CosmoPages } from '~client/projects/cosmo/router'
import { section } from '~client/projects/cosmo/moduleGeneralCN'
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
  const router = useRouter()

  /**
   * Формирует URL и переходит по нему
   */
  const onOpenArticle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    router.push(createString([CosmoPages.COSMO, CosmoPages.ARTICLES, e.currentTarget.id], '/'))
  }, [router])

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
              <SwiperSlide
                className={cn('Slide')}
                key={id}
                id={String(id)}
                onClick={onOpenArticle}
              >
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
