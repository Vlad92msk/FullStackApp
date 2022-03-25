import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import styles from './PhotoCard.module.scss'
import { Button } from '@client/shared/components/Button'
import { ButtonBox } from '@client/shared/components/ButtonBox'
import { Icon } from '@client/shared/components/Icon'
import { Image, MImage } from '@client/shared/components/Image'
import { useRouter } from 'next/router'
import { PhotoType } from '@client/projects/social/containers/Profile/data/photos.data'
import { InputLabel } from '@material-ui/core'
import { Modal } from '@client/shared/components/Modal'
import { useBooleanState } from '@client/shared/hooks'
import { TextInput } from '@client/shared/components/TextInput'
import { AreaInput } from '@client/shared/components/AreaInput'
import { AnimationToggleComponent } from '@client/shared/components/AnimationToggleComponent'
import { useMainAnim } from './functions/main.animate'

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
  const [comment, setComment] = useState(null)
  const [isHover, setHover] = useState(null)
  const [open, setOpen] = useState(null)
  const ref = useRef<HTMLDivElement>(null)

  const toggleCard = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  const main = useMainAnim(open, ref)

  const dwed = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('1', 1)
  }, [])

  return (
    <motion.div
      ref={ref}
      className={cn()}
      animate={main}
    >
      <div className={cn('Column')} style={{ width: '100%' }}>
        <div className={cn('Row')} style={{height: open? '100%': null, transition: '2s'}}>
          <ButtonBox
            className={cn('Photo')}
            style={{height: open? '100%': null, transition: '2s'}}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={toggleCard}
          >
            <MImage
              initial={open ? { objectFit: 'cover' } : { objectFit: 'contain' }}
              animate={open ? { objectFit: 'contain' } : {
                objectFit: 'cover',
                transition: { delay: 2 }
              }}
              exit={{ objectFit: 'cover', transition: { delay: 2 } }}
              path={{
                img: 'ava',
                project: 'social'
              }}
            />
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
                  <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'message-square'}
                        fill={'bluePrimrose50'} />
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
              <Image path={{
                img: 'ava',
                project: 'social'
              }} />
            </div>
            <Text className={cn('AuthorName')} children={authorName} size={'1'} />
          </div>
        )}
      </div>
      {
        open && (
          <motion.div
            className={cn('ChatContainer')}
            initial={{ width: '0%' }}
            animate={{ width: '50%', transition: { duration: 2 } }}
            exit={{ width: '1%', transition: { duration: 2 } }}
            transition={{ duration: 2 }}
            onClick={dwed}
          >
            <div className={cn('ChatFilter')}>filters</div>
            <div className={cn('ChatBox')}>
              <div className={cn('ChatBoxColumn')}>
                <div className={cn('ChatAuthorRow')}>
                  <div className={cn('ChatAuthorImg')}>
                    <Image sizePriority={open ? 'contain' : 'cover'} path={{
                      img: 'ava',
                      project: 'social'
                    }} />
                  </div>
                  <Text className={cn('AuthorName')} children={authorName} size={'1'} />
                </div>
                <AreaInput maxWidth={300} className={cn('Chat')} onChange={setComment} value={comment} />
              </div>
              <div className={cn('Column')}>
                <div className={cn('ChatAuthorRow')}>
                  <div className={cn('ChatAuthorImg')}>
                    <Image sizePriority={open ? 'contain' : 'cover'} path={{
                      img: 'ava',
                      project: 'social'
                    }} />
                  </div>
                  <Text className={cn('AuthorName')} children={authorName} size={'1'} />
                </div>
                <AreaInput maxWidth={300} className={cn('Chat')} onChange={setComment} value={comment} />
              </div>
              <div className={cn('Column')}>
                <div className={cn('ChatAuthorRow')}>
                  <div className={cn('ChatAuthorImg')}>
                    <Image sizePriority={open ? 'contain' : 'cover'} path={{
                      img: 'ava',
                      project: 'social'
                    }} />
                  </div>
                  <Text className={cn('AuthorName')} children={authorName} size={'1'} />
                </div>
                <AreaInput maxWidth={300} className={cn('Chat')} onChange={setComment} value={comment} />
              </div>
              <div className={cn('Column')}>
                <div className={cn('ChatAuthorRow')}>
                  <div className={cn('ChatAuthorImg')}>
                    <Image sizePriority={open ? 'contain' : 'cover'} path={{
                      img: 'ava',
                      project: 'social'
                    }} />
                  </div>
                  <Text className={cn('AuthorName')} children={authorName} size={'1'} />
                </div>
                <AreaInput maxWidth={300} className={cn('Chat')} onChange={setComment} value={comment} />
              </div>
              <div className={cn('Column')}>
                <div className={cn('ChatAuthorRow')}>
                  <div className={cn('ChatAuthorImg')}>
                    <Image sizePriority={open ? 'contain' : 'cover'} path={{
                      img: 'ava',
                      project: 'social'
                    }} />
                  </div>
                  <Text className={cn('AuthorName')} children={authorName} size={'1'} />
                </div>
                <AreaInput maxWidth={300} className={cn('Chat')} onChange={setComment} value={comment} />
              </div>
              <div className={cn('Column')}>
                <div className={cn('ChatAuthorRow')}>
                  <div className={cn('ChatAuthorImg')}>
                    <Image sizePriority={open ? 'contain' : 'cover'} path={{
                      img: 'ava',
                      project: 'social'
                    }} />
                  </div>
                  <Text className={cn('AuthorName')} children={authorName} size={'1'} />
                </div>
                <AreaInput maxWidth={300} className={cn('Chat')} onChange={setComment} value={comment} />
              </div>
              <div className={cn('Column')}>
                <div className={cn('ChatAuthorRow')}>
                  <div className={cn('ChatAuthorImg')}>
                    <Image sizePriority={open ? 'contain' : 'cover'} path={{
                      img: 'ava',
                      project: 'social'
                    }} />
                  </div>
                  <Text className={cn('AuthorName')} children={authorName} size={'1'} />
                </div>
                <AreaInput maxWidth={300} className={cn('Chat')} onChange={setComment} value={comment} />
              </div>
            </div>
          </motion.div>
        )
      }
    </motion.div>
  )
})
