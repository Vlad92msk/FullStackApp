import React, { useCallback, useEffect, useState } from 'react'

import { makeCn, storageGet, storageRemove } from '@shared/utils'
import { SpeedDial } from '@shared/components/SpeedDial/SpeedDial'
import { IconButton } from '@shared/components/IconButton'
import { useMutation } from '@apollo/client'
import { appQueries } from '~client/modules/core/graphql/appQueries'
import { Modal, ModalBody } from '@shared/components/Modal'
import ReactTooltip from 'react-tooltip'
import { SignInForm } from '~client/modules/core/containers/SignInForm'
import { User } from '~server/lib/connect/users/entitys/user.entity'
import { LocalStorageEnum } from '~public/models/localStorage'
import styles from './AppMenu.module.scss'
import { SignUpForm } from '~client/modules/core/containers/SignUpForm'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCoverflow, Thumbs } from 'swiper/core'
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
import 'swiper/components/thumbs/thumbs.min.css'

SwiperCore.use([EffectCoverflow, Thumbs])


const cn = makeCn('AppMenu', styles)


export const MenuApp = () => {

  const [signIn, setSignIn] = useState(false)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)


  const user = storageGet<User>(LocalStorageEnum.USER)

  const handleChangeSignIn = useCallback(() => {
    setThumbsSwiper(null)
    setSignIn((prev) => !prev)
  }, [])
  const [onHandleLogOut] = useMutation(appQueries.LOG_OUT)
  const handleLogOut = useCallback(() => {
    storageRemove(LocalStorageEnum.USER)
    return onHandleLogOut()
  }, [onHandleLogOut])

  return (
    <>
      <div className={cn()}>
        <div className={cn('UserName')}>{user?.name}</div>
        <SpeedDial
          buttonClassname={cn('MenuButton')}
          icon={'share'}
          direction={'left'}
          size={'medium'}
          elements={[
            <>
              {!user &&
              (<>
                <IconButton className={cn('MenuItem')} icon={'sign-in'} onClick={handleChangeSignIn} data-for='sign-in'
                            data-tip />
                <ReactTooltip id={'sign-in'} type={'dark'} place={'bottom'}>
                  Войти
                </ReactTooltip>
              </>)
              }
            </>,
            <>
              {user &&
              (<>
                <IconButton className={cn('MenuItem')} icon={'exit'} onClick={handleLogOut} data-for='exit' data-tip />
                <ReactTooltip id={'exit'} type={'dark'} place={'bottom'}>
                  Выйти
                </ReactTooltip>
              </>)}
            </>,
            // <>
            //   <IconButton key={3} className={cn('MenuItem')} icon={'info-2'} data-for='info' data-tip />
            //   <ReactTooltip id={'info'} type={'dark'} place={'bottom'}>
            //     Информация
            //   </ReactTooltip>
            // </>,
            <>
              <IconButton className={cn('MenuItem')} icon={'message-square'} data-for='message' data-tip />
              <ReactTooltip id={'message'} type={'dark'} place={'bottom'}>
                Сообщение
              </ReactTooltip>
            </>
          ]}
        />
      </div>

      <Modal open={signIn} size={'medium'} onClose={handleChangeSignIn} className={cn('Modal')}>
        {() => (
          <>
            <ModalBody className={cn('ModalBody')}>
              <div className={cn('ThumbRow')}>
                <div className={cn('Thumb', { activeSlide: !!!activeSlide })}>Войти</div>
                <div className={cn('Thumb', { activeSlide: !!activeSlide })}>Зарегистрироваться</div>
              </div>
              <div className={cn('SwiperContainer')}>
                <Swiper
                  thumbs={{ swiper: thumbsSwiper }}
                  effect={'coverflow'}
                  loop={true}
                  grabCursor={true}
                  onActiveIndexChange={({realIndex})=>setActiveSlide(realIndex)}
                >
                  <SwiperSlide><SignInForm setSignIn={setSignIn} /></SwiperSlide>
                  <SwiperSlide><SignUpForm setSignIn={setSignIn} /></SwiperSlide>
                </Swiper>
              </div>
            </ModalBody>
          </>
        )}
      </Modal>
    </>

  )
}


