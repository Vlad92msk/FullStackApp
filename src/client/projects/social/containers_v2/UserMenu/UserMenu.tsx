import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { makeCn } from '@client_shared/utils'

import { Text } from '@client_shared/components/Text'
import { Image } from '@client_shared/components/Image'
import { Icon } from '@client_shared/components/Icon'
import { useBooleanState } from '@client_shared/hooks'
import { Chat, Friends } from './components'
import styles from './UserMenu.module.scss'

const cn = makeCn('UserMenu', styles)


export const UserMenu: React.FC = React.memo(() => {
  const [openMassage, setOpenMassage, onCloseMassage] = useBooleanState(true)
  const [openFriends, setOpenFriends, onCloseFriends] = useBooleanState(true)
  const [openHash, setOpenHash, onCloseHash] = useBooleanState(false)

  /**
   * Закрываем диалоги, если закрыли список друзей
   */
  useEffect(() => {
     if (!openFriends) {
       onCloseMassage()
     }
  }, [openFriends]);

  /**
   * Закрываем друзей, если закрыли диалоги
   */
  useEffect(() => {
     if (openMassage) {
       setOpenFriends()
     }
  }, [openMassage]);

  return (
    <section className={cn()}>
      <div className={cn('Main')}>
        <div className={cn('Photo')}>
          <Image path={{
            img: 'ava',
            project: 'social'
          }} />
        </div>
        <div className={cn('Column')}>
          <Text className={cn('UserName')} size={'8'} weight={'medium'} children={'Firsov'} />
          <Text className={cn('UserName')} size={'8'} weight={'medium'} children={'Vlad'} />
          <Text className={cn('Hash')} size={'2'} children={'#firsovv'} />
          <div className={cn('Row')}>
            <Text className={cn('ButtonText')} size={'2'} onClick={setOpenFriends}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'friends'} />
              1
            </Text>
            <Text className={cn('ButtonText')} size={'2'} onClick={setOpenMassage}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'} />
              2
            </Text>
            <Text className={cn('ButtonText')} size={'2'} onClick={setOpenHash}>
              <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'hash'} />
              3
            </Text>
          </div>
          <span className={cn('Gap')} />
          <Text className={cn('Description')} size={'2'}>
            Любой текст который я хочу написать о себе, дать объявление и тд
            Очень длинный текст Очень длинный текст Очень длинный текст Очень длинный текст
            Очень длинный текст Очень длинный текст Очень длинный текст Очень длинный текст
            Очень длинный текст Очень длинный текст Очень длинный текст Очень длинный текст
            Очень длинный текст Очень длинный текст Очень длинный текст Очень длинный текст
            Очень длинный текст Очень длинный текст Очень длинный текст Очень длинный текст
          </Text>
        </div>
      </div>
      <div className={cn('Any')}></div>
      <Friends isOpenFriends={openFriends} handleOpenChat={setOpenMassage} handleCloseFriends={onCloseFriends} />
      <Chat isOpenChat={openMassage} handleCloseMassage={onCloseMassage} />
    </section>
  )
})
