import React, { useCallback, useState } from 'react'
import { makeCn, storageGet, storageRemove } from '@shared/utils'
import styles from './AppMenu.module.scss'

import { SpeedDial } from '@shared/components/SpeedDial/SpeedDial'
import { IconButton } from '@shared/components/IconButton'
import { useMutation } from '@apollo/client'
import { appQueries } from '~client/modules/core/graphql/queries'
import { Modal, ModalBody, ModalHeader } from '@shared/components/Modal'
import ReactTooltip from 'react-tooltip'
import { SignInForm } from '~client/modules/core/containers/SignInForm'
import { User } from '~server/lib/connect/users/entitys/user.entity'

const cn = makeCn('AppMenu', styles)

export const MenuApp = () => {

  const [signIn, setSignIn] = useState(false)

  const user = storageGet<User>('user')

  const handleChangeSignIn = useCallback(() => setSignIn((prev) => !prev), [])
  const [onHandleLogOut] = useMutation(appQueries.LOG_OUT)
  const handleLogOut = useCallback(() => {
    storageRemove('user')
    return onHandleLogOut()
  }, [onHandleLogOut])

  return (
    <>
      <div className={cn()}>
        <div>{user?.name}</div>
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
            <>
              <IconButton className={cn('MenuItem')} icon={'settings-2'} data-for='settings' data-tip />
              <ReactTooltip id={'settings'} type={'dark'} place={'bottom'}>
                Настройки
              </ReactTooltip>
            </>,
            <>
              <IconButton key={3} className={cn('MenuItem')} icon={'info-2'} data-for='info' data-tip />
              <ReactTooltip id={'info'} type={'dark'} place={'bottom'}>
                Информация
              </ReactTooltip>
            </>,
            <>
              <IconButton className={cn('MenuItem')} icon={'message-square'} data-for='message' data-tip />
              <ReactTooltip id={'message'} type={'dark'} place={'bottom'}>
                Сообщение
              </ReactTooltip>
            </>
          ]}
        />
      </div>

      <Modal open={signIn} size={'medium'} onClose={handleChangeSignIn}>
        {() => (
          <>
            <ModalHeader title={'Войти'} titlePosition={'center'} />
            <ModalBody>
              <SignInForm setSignIn={setSignIn} />

            </ModalBody>
          </>
        )}
      </Modal>
    </>

  )
}
