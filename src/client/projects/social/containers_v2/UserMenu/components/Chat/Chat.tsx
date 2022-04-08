import React from 'react'
import { makeCn } from '@client_shared/utils'

import { AnimatePresence, motion } from 'framer-motion'
import styles from './Chat.module.scss'
import { AreaInput } from '@client/projects/social/components'
import {
  ChatMassage,
  MASSAGE_FROM,
  MassageSmileReaction
} from '@client/projects/social/containers_v2/UserContent/components/ChatMassage/ChatMassage'
import { IconButton } from '@client/shared/components/IconButton'
import { Text } from '@client/shared/components/Text'

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
              <IconButton
                className={cn('Back')}
                icon={'arrow-left'}
                fill={'oldAsphalt50'}
                onClick={handleCloseMassage}
              />
              <div className={cn('Contact')}>
                <Text className={cn('ContactUserName')}>Friend Name</Text>
                <Text size={'1'} className={cn('ContactOnline')}>online</Text>
              </div>
              <IconButton icon={'headphones'} fill={'oldAsphalt50'} className={cn('Call')} />
            </div>
            <div className={cn('MainContainer')}>
              <ChatMassage
                date={'01.01.2001 в 15:10'}
                isWasSeen={true}
                smile={MassageSmileReaction.LIKE}
                from={MASSAGE_FROM.OTHER}
                massage={'dddddddd dwed  dwed wdedwed we d we d  we d w e d  weeeeeeeeeeeee'}
              />
              <ChatMassage
                date={'01.01.2001 в 15:10'}
                isWasSeen={true}
                smile={MassageSmileReaction.SMILE}
                from={MASSAGE_FROM.ME}
                massage={'dwed'}
              />
              <ChatMassage
                date={'01.01.2001 в 15:10'}
                isWasSeen={true}
                smile={MassageSmileReaction.DISLIKE}
                from={MASSAGE_FROM.ME}
                massage={'dwed'}
              />
              <ChatMassage
                date={'01.01.2001 в 15:10'}
                isWasSeen={true}
                smile={MassageSmileReaction.LIKE}
                from={MASSAGE_FROM.ME}
                massage={'dwed'}
              />
              <ChatMassage
                date={'01.01.2001 в 15:10'}
                isWasSeen={false}
                smile={MassageSmileReaction.LIKE}
                from={MASSAGE_FROM.ME}
                massage={'dwed'}
              />
              <ChatMassage
                date={'01.01.2001 в 15:10'}
                isWasSeen={true}
                smile={MassageSmileReaction.LIKE}
                from={MASSAGE_FROM.ME}
                massage={'dwed'}
              />
              <ChatMassage
                date={'01.01.2001 в 15:10'}
                isWasSeen={true}
                smile={MassageSmileReaction.LIKE}
                from={MASSAGE_FROM.OTHER}
                massage={'dwed'}
              />
              <ChatMassage
                date={'01.01.2001 в 15:10'}
                isWasSeen={true}
                smile={MassageSmileReaction.LIKE}
                from={MASSAGE_FROM.ME}
                massage={'dwed'}
              />
              <ChatMassage
                date={'01.01.2001 в 15:10'}
                isWasSeen={true}
                smile={MassageSmileReaction.LIKE}
                from={MASSAGE_FROM.ME}
                massage={'dwed'}
              />
            </div>
            <div className={cn('Footer')}>
              <div className={cn('FooterFileSmileRow')}>
                <IconButton size={'small'} fill={'oldAsphalt50'} icon={'file-outlined'} className={cn('FooterFile')} />
                <IconButton size={'small'} fill={'oldAsphalt50'} icon={'smile'} className={cn('FooterSmile')} />
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
