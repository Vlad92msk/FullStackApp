import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCube, Navigation } from 'swiper/core'

import { Text } from '@client/shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { Section } from '@client_shared/components/Section'
import { Icon } from '@client_shared/components/Icon'
import { SignInForm } from './components'
import { SignUpForm } from './components'
import styles from './Login.module.scss'

const cn = makeCn('Login', styles)
SwiperCore.use([EffectCube, Navigation])

export const Login: React.FC = (props) => {
  const { children } = props
  const [activeSlide, setActiveSlide] = useState(0)
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)
  return (
    <div className={cn()}>
      <Section
        className={cn('Section')}
        noPaddingRight
        bcgImg={{
          path: {
            img: 'bcg',
            project: 'portfolio'
          }
        }}>
        <div className={cn('ThumbRow')}>
          <Text
            className={cn('Thumb')}
            size={'7'}
            color={!Boolean(activeSlide) ? 'title' : 'note'}
            textTransform={'uppercase'}
            ref={(node) => setPrevEl(node)}
            children={'Вход'}
          />
          <Text
            className={cn('Thumb')}
            size={'7'}
            color={Boolean(activeSlide) ? 'title' : 'note'}
            textTransform={'uppercase'}
            ref={(node) => setNextEl(node)}
            children={'Регистрация'}
          />
        </div>
        <div className={cn('SwiperContainer')}>
          <div className={cn('ButtonsRow')}>
            <span className={cn('Button', { disabled: !Boolean(activeSlide) })} ref={(node) => setPrevEl(node)}>
             <Icon icon={'arrow-left-sharp'} size={'large'} fill={'bluePrimrose50'} />
            </span>
            <span className={cn('Button', { disabled: Boolean(activeSlide) })} ref={(node) => setNextEl(node)}>
              <Icon icon={'arrow-right-sharp'} size={'large'} fill={'bluePrimrose50'} />
            </span>
          </div>
          <Swiper
            effect={'cube'}
            navigation={{ prevEl, nextEl }}
            onActiveIndexChange={({ realIndex }) => setActiveSlide(realIndex)}
            grabCursor
            cubeEffect={{
              'shadow': true,
              'slideShadows': true,
              'shadowOffset': 20,
              'shadowScale': 0.94
            }}
          >
            <SwiperSlide><SignInForm /></SwiperSlide>
            <SwiperSlide><SignUpForm /></SwiperSlide>
          </Swiper>
        </div>
      </Section>
    </div>
  )
}
