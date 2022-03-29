import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { Image } from '@client/shared/components/Image'
import { Text } from '@client/shared/components/Text'
import { AreaInput } from '@client/shared/components/AreaInput'
import { COMMENTS } from '@client/projects/social/containers/Comments/data/comments.data'
import { Icon } from '@client/shared/components/Icon'
import styles from './Comments.module.scss'
import { UserSmall } from '@client/projects/social/components'

const cn = makeCn('Comments', styles)

export type CommentsType = {
  isOpenComments: boolean
}


export const Comments: React.FC<CommentsType> = React.memo(
  ({
     isOpenComments
   }) => {
    const [comment, setComment] = useState(null)
    const [isOpenAnswer, setOpenAnswer] = useState(false)

    return (
      <AnimatePresence initial={false} exitBeforeEnter>
        {isOpenComments && (
          <motion.div
            className={cn()}
            animate={{ width: '50%' }}
            exit={{ width: '0%' }}
            initial={{ width: '0%' }}
            transition={{ duration: 1.5 }}
          >
            <div className={cn('Filter')}>filters</div>
            <div className={cn('Container')}>
              <div className={cn('AuthorComment')}>
                <UserSmall textClassName={cn('AuthorName')} userName={'commentAuthor'} img={'ava'} />
                <AreaInput
                  maxWidth={'100%'}
                  className={cn('AuthorCommentInput')}
                  onChange={setComment}
                  value={comment}
                />
              </div>
              {COMMENTS.map(
                ({
                   commentAuthor,
                   commentDate,
                   commentDescription,
                   likeCount,
                   disLikeCounts,
                   answersCount,
                   answers
                 }) => (
                  <div className={cn('Comment')}>
                    <div className={cn('AuthorRow')}>
                      <UserSmall textClassName={cn('AuthorName')} userName={commentAuthor} img={'ava'} />
                      <Text className={cn('Date')} children={commentDate} size={'1'} />
                    </div>
                    <Text className={cn('UserComment')} size={'2'} children={commentDescription} />
                    <div className={cn('ButtonsGroup')}>
                      <div className={cn('Button')} onClick={() => setOpenAnswer(prev => !prev)}>
                        <Icon
                          className={cn('ButtonIcon')}
                          size={'small'}
                          icon={'message-square'}
                          fill={'bluePrimrose50'}
                        />
                        <Text className={cn('ButtonText')} size={'1'} children={answersCount || 0} />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div className={cn('Button')}>
                          <Icon
                            className={cn('ButtonIcon')}
                            size={'small'}
                            icon={'heart'}
                            fill={'redRose40'}
                          />
                          <Text className={cn('ButtonText')} size={'1'} children={likeCount || 0} />
                        </div>
                        <div className={cn('Button')}>
                          <Icon
                            className={cn('ButtonIcon')}
                            size={'small'}
                            icon={'dislike'}
                            fill={'bluePrimrose50'}
                          />
                          <Text className={cn('ButtonText')} size={'1'} children={disLikeCounts || 0} />
                        </div>
                      </div>
                    </div>
                    <AnimatePresence initial={false} exitBeforeEnter>
                      {isOpenAnswer && (
                        <motion.div
                          className={cn('AnswerContainer')}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          initial={{ height: 0 }}
                          transition={{ duration: 1.5 }}
                        >
                          {answers.map(
                            ({
                               commentAuthor,
                               commentDate,
                               commentDescription,
                               likeCount,
                               disLikeCounts
                             }) => (
                              <div className={cn('AnswerComment')}>
                                <div className={cn('AnswerCommentAuthorRow')}>
                                  <UserSmall textClassName={cn('AuthorName')} userName={commentAuthor} img={'ava'} />
                                  <Text className={cn('Date')} children={commentDate} size={'1'} />
                                </div>
                                <Text className={cn('UserComment')} size={'1'} children={commentDescription} />
                                <div className={cn('ButtonsGroup')}>
                                  <div className={cn('Button')}>
                                    <Icon
                                      className={cn('ButtonIcon')}
                                      size={'small'}
                                      icon={'message-square'}
                                      fill={'bluePrimrose50'} />
                                    <Text className={cn('ButtonText')} size={'1'} children={answersCount || 0} />
                                  </div>
                                  <div style={{ display: 'flex' }}>
                                    <div className={cn('Button')}>
                                      <Icon
                                        className={cn('ButtonIcon')}
                                        size={'small'}
                                        icon={'heart'}
                                        fill={'redRose40'}
                                      />
                                      <Text className={cn('ButtonText')} size={'1'} children={likeCount || 0} />
                                    </div>
                                    <div className={cn('Button')}>
                                      <Icon
                                        className={cn('ButtonIcon')}
                                        size={'small'}
                                        icon={'dislike'}
                                        fill={'bluePrimrose50'}
                                      />
                                      <Text className={cn('ButtonText')} size={'1'} children={disLikeCounts || 0} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  })
