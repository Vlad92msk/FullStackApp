import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'

import { Text } from '@client_shared/components/Text'
import { Image } from '@client_shared/components/Image'
import { Button } from '@client_shared/components/Button'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { useBooleanState } from '@client_shared/hooks'
import styles from './UserMenu.module.scss'

const cn = makeCn('UserMenu', styles)


export const UserMenu: React.FC = () => {
  const [open, setOpen, onClose] = useBooleanState(false)

  return (
    <section className={cn()}>
      <div className={cn('Main')}>
        <div className={cn('Photo')}>
          <Image sizePriority={'cover'} path={{
            img: 'ava',
            project: 'social'
          }} />
        </div>
        <Text className={cn('UserName')} size={'3'} children={'UserName'} />
        <div className={cn('Row')}>
          <Text className={cn('Hash')} size={'2'} children={'#firsovv'} />
          <div className={cn('Row')}>
            <Icon className={cn('ButtonIcon')} size={'small'} icon={'analytics'} />
            <Text className={cn('VisitsCount')} size={'2'} children={'1'} />
          </div>
        </div>
      </div>
      <span className={cn('Gap')} />
      <div className={cn('Any')}>
        <div className={cn('Row')}>
          <ButtonBox className={cn('Button')} onClick={setOpen} onClickCapture={onClose}>
            <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'friends'} />
            <Text className={cn('ButtonText')} size={'2'} children={'1'} />
          </ButtonBox>
          <ButtonBox className={cn('Button')} onClick={setOpen} onClickCapture={onClose}>
            <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'} />
            <Text className={cn('ButtonText')} size={'2'} children={'2'} />
          </ButtonBox>
          <ButtonBox className={cn('Button')} onClick={setOpen} onClickCapture={onClose}>
            <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'hash'} />
            <Text className={cn('ButtonText')} size={'2'} children={'3'} />
          </ButtonBox>
        </div>
        <AnimatePresence exitBeforeEnter>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', marginTop: '20px' }}
              transition={{ duration: .5, ease: 'easeIn', power: 20 }}
            >
              <div className={cn('FriendsRow')}>
                <div className={cn('FriendsImgContainer')}>
                  <Image sizePriority={'cover'} path={{
                    img: 'ava',
                    project: 'social'
                  }} />
                </div>
                <Text className={cn('FriendsUserName')} children={'dwed wed'} />
                <span className={cn('FriendsStatus', { status: 'online' })} />
              </div>
              <div className={cn('FriendsRow')}>
                <div className={cn('FriendsImgContainer')}>
                  <Image sizePriority={'cover'} path={{
                    img: 'ava',
                    project: 'social'
                  }} />
                </div>
                <Text className={cn('FriendsUserName')} children={'dwed wed'} />
                <span className={cn('FriendsStatus', { status: 'online' })} />
              </div>
              <div className={cn('FriendsRow')}>
                <div className={cn('FriendsImgContainer')}>
                  <Image sizePriority={'cover'} path={{
                    img: 'ava',
                    project: 'social'
                  }} />
                </div>
                <Text className={cn('FriendsUserName')} children={'dwed wed'} />
                <span className={cn('FriendsStatus', { status: 'offline' })} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
