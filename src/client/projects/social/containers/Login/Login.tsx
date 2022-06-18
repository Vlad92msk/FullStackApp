import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCube } from 'swiper/core'

import { Modal } from '@client/shared/components/Modal'
import { Text } from '@client/shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { Section } from '@client/shared/components/Section'
import { SignInForm } from '@client/projects/social/containers/Login/components'
import { SignUpForm } from '@client/projects/social/containers/Login/components'
import styles from './Login.module.scss'

const cn = makeCn('Login', styles)
SwiperCore.use([EffectCube])

export const Login: React.FC = (props) => {
  const { children } = props
  const [activeSlide, setActiveSlide] = useState(0)
  const [signIn, setSignIn] = useState(false)
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
          <Swiper
            effect={'cube'}
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
