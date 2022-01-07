import React, { useCallback, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCube, Navigation } from 'swiper/core'

import { makeCn, storageGet, storageRemove } from '@shared/utils'
import { SpeedDial } from '@shared/components/SpeedDial/SpeedDial'
import { IconButton } from '@shared/components/IconButton'
import { Modal } from '@shared/components/Modal'
import { User } from '~server/lib/connect/users/entitys/user.entity'
import { LocalStorageEnum } from '~public/models/localStorage'
import { SignInForm, SignUpForm } from './components'

import { Text } from '@shared/components/Text'
import { useAuthSignOutMutation } from '~client/projects/gql-generated-hooks'
import styles from './AppMenu.module.scss'

SwiperCore.use([EffectCube])


const cn = makeCn('AppMenu', styles)


export const MenuApp = () => {

  const [onHandleLogOut] = useAuthSignOutMutation()

  const [signIn, setSignIn] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)


  const user = storageGet<User>(LocalStorageEnum.USER)

  const handleChangeSignIn = useCallback(() => {
    setSignIn((prev) => !prev)
  }, [])

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
            // <AuthGuard roles={[RoleEnum.participant]}>
            //   <IconButton key={3} className={cn('MenuItem')} icon={'info-2'} data-for='info' data-tip />
            //   <ReactTooltip id={'info'} type={'dark'} place={'bottom'}>
            //     Информация
            //   </ReactTooltip>
            // </AuthGuard>,
            <>
              <IconButton className={cn('MenuItem')} icon={'message-square'} data-for='message' data-tip />
              <ReactTooltip id={'message'} type={'dark'} place={'bottom'}>
                Сообщение
              </ReactTooltip>
            </>
          ]}
        />
      </div>

      <Modal open={signIn} onClose={handleChangeSignIn} className={cn('Modal')}>
        <div className={cn('ModalBody')}>
          <div className={cn('ThumbRow')}>
            <Text className={cn('Thumb')} size={'7'} color={!Boolean(activeSlide) ? 'title' : 'note'} children={'Войти'} />
            <Text className={cn('Thumb')} size={'7'} color={Boolean(activeSlide) ? 'title' : 'note'} children={'Зарегистрироваться'} />
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
        </div>
      </Modal>
    </>
  )
}


