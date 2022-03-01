import React, { useCallback, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import ReactTooltip from 'react-tooltip'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCube } from 'swiper/core'

import { useAuthSignOutMutation, useFindInterfaceQuery, User } from '@client_projects/gql-generated-hooks'
import { makeCn, storageGet, storageRemove } from '@client_shared/utils'
import { SpeedDial } from '@client_shared/components/SpeedDial/SpeedDial'
import { IconButton } from '@client_shared/components/IconButton'
import { Modal } from '@client_shared/components/Modal'
import { Text } from '@client_shared/components/Text'
import { Option, Select } from '@client_shared/components/Select'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { ProjectLanguage } from '@client_pages/_app'
import { LocalStorageEnum } from '@client_public/models/localStorage'
import { SignInForm, SignUpForm } from './components'

import styles from './AppMenu.module.scss'
const cn = makeCn('AppMenu', styles)
SwiperCore.use([EffectCube])


export const MenuApp = () => {
  const { push } = useRouter()
  const {
    data: {
      userInterfacePortfolioFindAll: userInterface
    } = {},
    loading,
    error
  } = useFindInterfaceQuery()

  /**
   * Переключение языка
   */
  const { language, setLanguage } = useContext(ProjectLanguage)
  const changeLang = useCallback(async (lang) =>
      await push({ query: { lang } })
    , [setLanguage])

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
    <ResponseApi status={[loading]} errors={[error]}>
      {() => <>
        <div className={cn()}>
          <div className={cn('User')}>
            <div className={cn('UserName')}>{user?.name}</div>
            {/*TODO: Стилизовать как нибудь*/}
            <Select className={cn('Lang')} onChange={changeLang} value={language} placeholder={''}>
              <Option value={'ru'}>ru</Option>
              <Option value={'en'}>en</Option>
            </Select>
          </div>
          <SpeedDial
            buttonClassname={cn('MenuButton')}
            icon={'share'}
            direction={'left'}
            size={'medium'}
            elements={[
              <>
                {!user &&
                (<>
                  <IconButton className={cn('MenuItem')} icon={'sign-in'} onClick={handleChangeSignIn}
                              data-for='sign-in'
                              data-tip />
                  <ReactTooltip id={'sign-in'} type={'dark'} place={'bottom'}>
                    {userInterface.toComeIn}
                  </ReactTooltip>
                </>)
                }
              </>,
              <>
                {user &&
                (<>
                  <IconButton className={cn('MenuItem')} icon={'exit'} onClick={handleLogOut} data-for='exit'
                              data-tip />
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
                  {userInterface.message}
                </ReactTooltip>
              </>
            ]}
          />
        </div>

        <Modal open={signIn} onClose={handleChangeSignIn} className={cn('Modal')}>
          <div className={cn('ModalBody')}>
            <div className={cn('ThumbRow')}>
              <Text className={cn('Thumb')} size={'7'} color={!Boolean(activeSlide) ? 'title' : 'note'}
                    children={userInterface.toComeIn} />
              <Text className={cn('Thumb')} size={'7'} color={Boolean(activeSlide) ? 'title' : 'note'}
                    children={userInterface.register} />
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
      </>}
    </ResponseApi>
  )
}


