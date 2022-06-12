import React, { useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { pick } from 'lodash'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Button } from '@client_shared/components/Button'
import { ButtonBox } from '@client_shared/components/ButtonBox'
import { Icon } from '@client_shared/components/Icon'
import { Image } from '@client_shared/components/Image'
import { dateType1 } from '@client_shared/utils/date'
import { useBooleanState } from '@client_shared/hooks'
import { PhotoType } from '../../data/photoItems.data'
import { DigitalCardDraggable } from './DigitalCardDraggable'
import styles from './DigitalCard.module.scss'

const cn = makeCn('DigitalCard', styles)

export const enum DigitalCardType {
  PHOTO = 'photo',
  VIDEO = 'video'
}

interface DigitalCardProps {
  type: DigitalCardType
  item: PhotoType
  index: number
}

/**
 * Карточка для ФОТО/ВИДЕО
 */
export const DigitalCard: React.FC<DigitalCardProps> = React.memo((props) => {
  const { index, item, type } = props
  const {
    id,
    commentsCount,
    likeCount,
    date,
    disLikeCounts
  } = item

  const [isHover, setVisible, setHide] = useBooleanState(false)
  const { push, pathname, query } = useRouter()
  const handleOpenPage = useCallback(() => {
    console.log('pathname', pathname)
    push({
      pathname: pathname + '/[digital_type]/[digital_id]',
      query: { ...pick(query, ['lang', 'user_id']), digital_type: type, digital_id: id }
    })
  }, [pathname, query, id, type])

  return (
    <DigitalCardDraggable id={id} index={index}>
      <div className={cn()}>
        <div className={cn('Row')}>
          <ButtonBox
            className={cn('Photo')}
            onMouseEnter={setVisible}
            onMouseLeave={setHide}
            onClick={handleOpenPage}
          >
            <Image
              path={{ img: 'ava', project: 'social' }}
            />
          </ButtonBox>
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              className={cn('TitleRow')}
              data-hover={isHover}
            >
              <ButtonBox className={cn('Button')}>
                <Icon className={cn('ButtonIcon')} size={'ordinary'} icon={'eye-off'} fill={'oldAsphalt50'} />
                <Text className={cn('ButtonText')} size={'2'} children={'45'} />
              </ButtonBox>
              <Text className={cn('ButtonText')} size={'2'} children={dateType1(date)} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              className={cn('ButtonsGroup')}
              data-hover={isHover}
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
      </div>
    </DigitalCardDraggable>
  )
})
