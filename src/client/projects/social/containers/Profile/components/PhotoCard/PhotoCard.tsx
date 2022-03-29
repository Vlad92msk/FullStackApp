import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'

import { useRouter } from 'next/router'
import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Button } from '@client/shared/components/Button'
import { ButtonBox } from '@client/shared/components/ButtonBox'
import { Icon } from '@client/shared/components/Icon'
import { Image, MImage } from '@client/shared/components/Image'
import { PhotoType } from '@client/projects/social/containers/Profile/data/photos.data'
import { useMainAnim } from './functions/main.animate'
import { Comments } from '@client/projects/social/containers/Comments'
import styles from './PhotoCard.module.scss'

const cn = makeCn('PhotoCard', styles)


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
  const [isHover, setHover] = useState(false)
  const [open, setOpen] = useState(null)
  const ref = useRef<HTMLDivElement>(null)
  const { push, query: { lang, layout, albumId } } = useRouter()

  /**
   * Открыть фотоальбом
   */
  useEffect(() => {
    if (open === null) {
      return
    }
    if (open) {
      push({
        query: { lang, layout, albumId, id }
      })
    } else {
      push({
        query: { lang, layout, albumId }
      })
    }

  }, [open])

  const toggleCard = useCallback(() => {
    setOpen(prev => !prev)
  }, [])

  const main = useMainAnim(open, ref)

  return (
    <motion.div
      ref={ref}
      className={cn()}
      animate={main}
    >
      <div
        className={cn('Column')}
        style={{
          width: '100%',
          background: open ? '#2b3041' : null,
          padding: open ? '24px' : null
        }}
      >
        <div className={cn('Row')} style={{
          height: open ? '100%' : null,
          transition: '2s',
          flexDirection: open ? 'column' : 'row'
        }}>
          <ButtonBox
            className={cn('Photo')}
            style={{ height: open ? '100%' : null, transition: '2s' }}
            onMouseEnter={() => !open && setHover(true)}
            onMouseLeave={() => !open && setHover(false)}
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
            <motion.div
              className={cn('TitleRow')}
              data-hover={isHover}
              data-open={open}
            >
              <ButtonBox className={cn('Button')} onClick={() => 1}>
                <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'eye-off'} fill={'oldAsphalt50'} />
                <Text className={cn('ButtonText')} size={'2'} children={'45'} />
              </ButtonBox>
              <Text className={cn('Date')} size={'2'} children={date} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              className={cn('ButtonsGroup')}
              data-hover={isHover}
              data-open={open}
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
          </AnimatePresence>
        </div>
        {authorName && (
          <div className={cn('AuthorBox')}>
            <div className={cn('AuthorRow')}>
              <div className={cn('AuthorImg')}>
                <Image path={{
                  img: 'ava',
                  project: 'social'
                }} />
              </div>
              <Text className={cn('AuthorName')} children={authorName} size={'1'} />
            </div>
            {open && (
              <Text
                className={cn('Subscribe')}
                size={'1'}
                onClick={() => console.log('subscribe')}
                children={'Подписаться'} />
            )}
          </div>
        )}
        {open && (
          <>
            <Text className={cn('Title')} children={'Title'} />
            <Text className={cn('Description')}>
              fewf lkdowe dlwkefdjefpowe lffwjpfo fwrpfj wjefpwjefowef weofjpweojf fwoejfpojweojfopewjfew fwepfj
              wefkwieof wefkwpeofj fwejfpoewjf wefjwepojf ewfweojfpowen fwefnwepojfpowen fwoejfpojwepofw fwejfopwe weofj
              fwe fwe f ewfwefjfw fwfpi ikf foiwefnf
              fewf lkdowe dlwkefdjefpowe lffwjpfo fwrpfj wjefpwjefowef weofjpweojf fwoejfpojweojfopewjfew fwepfj
              wefkwieof wefkwpeofj fwejfpoewjf wefjwepojf ewfweojfpowen fwefnwepojfpowen fwoejfpojwepofw fwejfopwe weofj
              fwe fwe f ewfwefjfw fwfpi ikf foiwefnf
              fewf lkdowe dlwkefdjefpowe lffwjpfo fwrpfj wjefpwjefowef weofjpweojf fwoejfpojweojfopewjfew fwepfj
              wefkwieof wefkwpeofj fwejfpoewjf wefjwepojf ewfweojfpowen fwefnwepojfpowen fwoejfpojwepofw fwejfopwe weofj
              fwe fwe f ewfwefjfw fwfpi ikf foiwefnf
              fewf lkdowe dlwkefdjefpowe lffwjpfo fwrpfj wjefpwjefowef weofjpweojf fwoejfpojweojfopewjfew fwepfj
              wefkwieof wefkwpeofj fwejfpoewjf wefjwepojf ewfweojfpowen fwefnwepojfpowen fwoejfpojwepofw fwejfopwe weofj
              fwe fwe f ewfwefjfw fwfpi ikf foiwefnf
              fewf lkdowe dlwkefdjefpowe lffwjpfo fwrpfj wjefpwjefowef weofjpweojf fwoejfpojweojfopewjfew fwepfj
              wefkwieof wefkwpeofj fwejfpoewjf wefjwepojf ewfweojfpowen fwefnwepojfpowen fwoejfpojwepofw fwejfopwe weofj
              fwe fwe f ewfwefjfw fwfpi ikf foiwefnf
            </Text>
          </>
        )}
      </div>
      {open && (<Comments />)}
    </motion.div>
  )
})
