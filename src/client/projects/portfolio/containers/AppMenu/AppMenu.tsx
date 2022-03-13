import React, { useCallback, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import ReactTooltip from 'react-tooltip'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCube } from 'swiper/core'

import { useAuthSignOutMutation, useFindInterfaceQuery, User } from '@client_projects/gql-generated-hooks'
import { makeCn, storageGet, storageRemove } from '@client_shared/utils'
import { IconButton } from '@client_shared/components/IconButton'
import { Modal } from '@client_shared/components/Modal'
import { Text } from '@client_shared/components/Text'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { ProjectLanguage } from '@client_pages/_app'
import { LocalStorageEnum } from '@client_public/models/localStorage'
import { SpeedDail } from '@client_shared/components/SpeedDial/SpeedDial'

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
  const changeLang = useCallback((lang) => {
      return push({ query: { lang: lang.target.value } })
    }
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
            <div style={{
              display: 'flex',
              overflow: 'hidden',
              borderRadius: '15px',
              width: 'fit-content'
            }}>
              <input onChange={changeLang} className={cn('RadioInput')} type={'radio'} value={'ru'} name={'lang'}
                     id={'ru'} checked={language === 'ru'} />
              <label className={cn('RadioLabel')} htmlFor={'ru'}>ru</label>

              <input onChange={changeLang} className={cn('RadioInput')} type={'radio'} value={'en'} name={'lang'}
                     id={'en'} checked={language === 'en'} />
              <label className={cn('RadioLabel')} htmlFor={'en'}>en</label>

              <input onChange={changeLang} className={cn('RadioInput')} type={'radio'} value={'fr'} name={'lang'}
                     id={'fr'} checked={language === 'fr'} />
              <label className={cn('RadioLabel')} htmlFor={'fr'}>fr</label>
            </div>
          </div>
          <div className={cn('MenuButton')}>
            <SpeedDail
              gap={80}
              elements={[
                !user && {
                  id: 1,
                  element: (<>
                    <IconButton className={cn('MenuItem')} icon={'sign-in'} onClick={handleChangeSignIn}
                                data-for='sign-in'
                                data-tip />
                    <ReactTooltip id={'sign-in'} type={'dark'} place={'bottom'}>
                      {userInterface?.toComeIn}
                    </ReactTooltip>
                  </>)
                },
                user && {
                  id: 2,
                  element: (<>
                    <IconButton className={cn('MenuItem')} icon={'exit'} onClick={handleLogOut} data-for='exit'
                                data-tip />
                    <ReactTooltip id={'exit'} type={'dark'} place={'bottom'}>
                      Выйти
                    </ReactTooltip>
                  </>)
                },
                {
                  id: 3,
                  element: (<>
                    <IconButton className={cn('MenuItem')} icon={'message-square'} data-for='message' data-tip />
                    <ReactTooltip id={'message'} type={'dark'} place={'bottom'}>
                      {userInterface?.message}
                    </ReactTooltip>
                  </>)
                }
              ]}
            />
          </div>
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


