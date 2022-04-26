import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper/core'
import { classnames } from '@bem-react/classnames'

import { makeCn } from '@client_shared/utils'
import { Image } from '@client/shared/components/Image'
import styles from './SliderMedia.module.scss'


SwiperCore.use([Pagination])

const cn = makeCn('SliderMedia', styles)


type SliderMediaProps = {
  sliders: { name: string, src: string }[]
  className?: string
  height?: string
  width?: string
}
export const SliderMedia: React.FC<SliderMediaProps> = React.memo((props) => {
  const { sliders, className, height, width } = props
  if (!sliders || !sliders.length) return null


  return (
    <div className={classnames(cn(), className)} style={{ height, width }}>
      {sliders.length > 1 ? (
        <Swiper
          className={cn('Slider')}
          pagination={{ dynamicBullets: true }}
        >
          {sliders.map(({ name, src }) => (
            <SwiperSlide
              className={cn('Slide')}
              key={name}
              id={name}
            >
              <div className={cn('ImgWrapper')}>
                <Image className={cn('Img')} withOptimized={false} isOpenFullScreen path={{ img: src }} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={cn('ImgWrapper')}>
          <Image withOptimized={false} isOpenFullScreen className={cn('Img')} path={{ img: sliders[0].src }} />
        </div>
      )}
    </div>
  )
})
