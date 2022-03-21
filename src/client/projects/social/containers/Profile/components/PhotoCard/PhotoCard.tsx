import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import styles from './PhotoCard.module.scss'
import { Button } from '@client/shared/components/Button'
import { ButtonBox } from '@client/shared/components/ButtonBox'
import { Icon } from '@client/shared/components/Icon'
import { Image } from '@client/shared/components/Image'
import { useRouter } from 'next/router'
import { PhotoType } from '@client/projects/social/containers/Profile/data/photos.data'
import { InputLabel } from '@material-ui/core'
import { Modal } from '@client/shared/components/Modal'
import { useBooleanState } from '@client/shared/hooks'
import { TextInput } from '@client/shared/components/TextInput'
import { AreaInput } from '@client/shared/components/AreaInput'

const cn = makeCn('PhotoCard', styles)


const initialTranslateX = { transform: 'translateX(100%)' }
const animateTranslateX = { transform: 'translateX(0%)' }
const initialTranslateY = { transform: 'translateY(100%)' }
const animateTranslateY = { transform: 'translateY(0%)' }
const transition = { duration: .5 }


export interface PhotoCardType extends PhotoType {
}

export const PhotoCard: React.FC<PhotoCardType> = React.memo((props) => {
  const {
    id,
    commentsCount,
    likeCount,
    date,
    commentUsersIds,
    description,
    disLikeCounts,
    disLikeUsersIds,
    hash,
    likeUsersIds,
    authorName,
    title
  } = props
  const [open, handleOpen, handleClose] = useBooleanState(false)
  const [comment, setComment] = useState(null)
  const [isHover, setHover] = useState(null)
  console.log('isHover', isHover)

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={cn()}>
      <div className={cn('Row')}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <ButtonBox onClick={handleOpen} className={cn('Photo')}>
            <Image path={{
              img: 'ava',
              project: 'social'
            }} />
          </ButtonBox>
          <AnimatePresence exitBeforeEnter initial={false}>
            {isHover && (
              <motion.div
                className={cn('TitleRow')}
                initial={initialTranslateY}
                animate={animateTranslateY}
                exit={initialTranslateY}
                transition={transition}
              >
                <ButtonBox className={cn('Button')} onClick={() => 1}>
                  <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'eye-off'} fill={'oldAsphalt50'} />
                  <Text className={cn('ButtonText')} size={'2'} children={'45'} />
                </ButtonBox>
                <Text className={cn('Date')} size={'2'} children={date} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence exitBeforeEnter initial={false}>
          {isHover && (
            <motion.div
              initial={initialTranslateX}
              animate={animateTranslateX}
              exit={initialTranslateX}
              transition={transition}
              className={cn('ButtonsGroup')}
            >
              <div className={cn('Button')}>
                <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'heart'} fill={'redRose40'} />
                <Text className={cn('ButtonText')} size={'2'} children={likeCount || 0} />
              </div>
              <div className={cn('Button')}>
                <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'dislike'} fill={'bluePrimrose50'} />
                <Text className={cn('ButtonText')} size={'2'} children={disLikeCounts || 0} />
              </div>
              <div className={cn('Button')}>
                <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'} fill={'bluePrimrose50'} />
                <Text className={cn('ButtonText')} size={'2'} children={commentsCount || 0} />
              </div>
              <div className={cn('Button')}>
                <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'hash'} fill={'oldAsphalt40'} />
                <Text className={cn('ButtonText')} size={'2'} children={commentsCount || 0} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {authorName && (
        <div className={cn('AuthorRow')}>
          <div className={cn('AuthorImg')}>
            <Image sizePriority={'cover'} path={{
              img: 'ava',
              project: 'social'
            }} />
          </div>
          <Text className={cn('AuthorName')} children={authorName} size={'1'} />
        </div>
      )}
      <Modal open={open} onClose={handleClose} className={cn('Modal')}>
        <div className={cn('ModalPhotoContainer')}>
          <Image
            sizePriority={'contain'}
            path={{
              img: 'ava',
              project: 'social'
            }}
          />
        </div>
        <div className={cn('Chat')}>
          <AreaInput style={{ width: '100%', height: '100%' }} onChange={setComment} value={comment} />
        </div>
      </Modal>
    </div>
  )
})
