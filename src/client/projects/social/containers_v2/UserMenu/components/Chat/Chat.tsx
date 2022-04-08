import React from 'react'
import { makeCn } from '@client_shared/utils'

import { AnimatePresence, motion } from 'framer-motion'
import styles from './Chat.module.scss'
import { AreaInput } from '@client/projects/social/components'
import {
  ChatMassage,
  MASSAGE_FROM
} from '@client/projects/social/containers_v2/UserContent/components/ChatMassage/ChatMassage'

const cn = makeCn('Chat', styles)

export type ChatType = {
  isOpenChat: boolean
  handleCloseMassage: () => void
}
export const Chat: React.FC<ChatType> = React.memo(({ isOpenChat, handleCloseMassage }) => {

  return (
    <AnimatePresence exitBeforeEnter>
      {
        isOpenChat && (
          <motion.div
            className={cn()}
            initial={{ left: '100%' }}
            animate={{ left: '230%' }}
            exit={{ left: '0%' }}
            transition={{ duration: 1, power: 20 }}
          >
            <div className={cn('Header')}>
              <div className={cn('Back')} onClick={handleCloseMassage}>back</div>
              <div className={cn('Contact')}>
                <div className={cn('ContactUserName')}>userName</div>
                <div className={cn('ContactOnline')}>online</div>
              </div>
              <div className={cn('Call')}>call</div>
            </div>
            <div className={cn('MainContainer')}>
              <ChatMassage from={MASSAGE_FROM.OTHER} massage={'dddddddd dwed  dwed wdedwed we d we d  we d w e d  weeeeeeeeeeeee'} />
              <ChatMassage from={MASSAGE_FROM.ME}  massage={'dwed'}/>
            </div>
            <div className={cn('Footer')}>
              <div className={cn('FooterFileSmileRow')}>
                <div className={cn('FooterFile')}>file</div>
                <div className={cn('FooterSmile')}>smile</div>
              </div>
              <div className={cn('FooterInput')}>
                <AreaInput />
              </div>
            </div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
})
