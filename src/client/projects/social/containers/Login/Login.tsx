import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCube, Navigation } from 'swiper/core'

import { Text } from '@client/shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { Section } from '@client/shared/components/Section'
import { SignInForm } from './components'
import { SignUpForm } from './components'
import styles from './Login.module.scss'
import { Icon } from '@client/shared/components/Icon'
import { IconButton } from '@client/shared/components/IconButton'

const cn = makeCn('Login', styles)
SwiperCore.use([EffectCube, Navigation])

export const Login: React.FC = (props) => {
  const { children } = props
  const [activeSlide, setActiveSlide] = useState(0)
  const [signIn, setSignIn] = useState(false)
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
            children={'Войти'}
          />
          <Text
            className={cn('Thumb')}
            size={'7'}
            color={Boolean(activeSlide) ? 'title' : 'note'}
            children={'Зарегистрироваться'}
          />
        </div>
        <div className={cn('SwiperContainer')}>
          <div className={cn('ButtonsRow')}>
            <span className={cn('Buttons')} ref={(node) => setPrevEl(node)}>
             <Icon icon={'arrow-left-sharp'} size={'large'} fill={'bluePrimrose50'} />
            </span>
            <span className={cn('Buttons')} ref={(node) => setNextEl(node)}>
              <Icon icon={'arrow-right-sharp'} size={'large'} fill={'bluePrimrose50'} />
            </span>
          </div>
          <Swiper
            effect={'cube'}
            navigation={{ prevEl, nextEl }}
            cubeEffect={{
              'shadow': true,
              'slideShadows': true,
              'shadowOffset': 20,
              'shadowScale': 0.94
            }}
            onActiveIndexChange={({ realIndex }) => setActiveSlide(realIndex)}
            grabCursor
          >
            <SwiperSlide><SignInForm setSignIn={setSignIn} /></SwiperSlide>
            <SwiperSlide><SignUpForm setSignIn={setSignIn} /></SwiperSlide>
          </Swiper>
        </div>
      </Section>
    </div>
  )
}
