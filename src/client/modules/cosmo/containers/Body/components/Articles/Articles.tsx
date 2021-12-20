import React from 'react'
import { makeCn } from '@shared/utils'
import styles from './Articles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import { Title } from '@shared/components/Title'
import { Section } from '@shared/components/Section'
import { section } from '~client/modules/cosmo/moduleGeneralCN'

const cn = makeCn('Articles', styles)

SwiperCore.use([Navigation])

type ArticlesType = {}

export const Articles: React.FC<ArticlesType> = () => {

  return (
    <Section className={section()} noPaddingRight>
      <div className={cn()}>
        <div className={cn('Title')}>Статьи</div>
        <Swiper
          className={cn('Slider')}
          slidesPerView={3}
          spaceBetween={30}
          navigation
        >
          <SwiperSlide className={cn('Slide')}>
            <div className={cn('Item')}>
              <div className={cn('ItemImg')}>img</div>
              <div className={cn('ItemTitle')}>title</div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={cn('Slide')}>
            <div className={cn('Item')}>
              <div className={cn('ItemImg')}>img</div>
              <div className={cn('ItemTitle')}>title</div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={cn('Slide')}>
            <div className={cn('Item')}>
              <div className={cn('ItemImg')}>img</div>
              <div className={cn('ItemTitle')}>title</div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={cn('Slide')}>
            <div className={cn('Item')}>
              <div className={cn('ItemImg')}>img</div>
              <div className={cn('ItemTitle')}>title</div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </Section>
  )
}
