import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { Image } from '@client/shared/components/Image'
import { Text } from '@client/shared/components/Text'
import { AreaInput } from '@client/shared/components/AreaInput'
import styles from './Comments.module.scss'
import { COMMENTS } from '@client/projects/social/containers/Comments/data/comments.data'
import { Icon } from '@client/shared/components/Icon'

const cn = makeCn('Comments', styles)

export type CommentsType = {}


export const Comments: React.FC<CommentsType> = React.memo(() => {
  const [comment, setComment] = useState(null)
  const [isOpenAnswer, setOpenAnswer] = useState(false)

  return (
    <div className={cn()}>
      <div className={cn('Filter')}>filters</div>
      <div className={cn('Container')}>
        <div className={cn('AuthorComment')}>
          <div className={cn('AuthorRow')}>
            <div className={cn('AuthorImgWrapper')}>
              <Image sizePriority={open ? 'contain' : 'cover'} path={{
                img: 'ava',
                project: 'social'
              }} />
            </div>
            <Text className={cn('AuthorName')} children={'authorName'} size={'1'} />
          </div>
          <AreaInput maxWidth={'100%'} className={cn('AuthorCommentInput')} onChange={setComment} value={comment} />
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
                <div className={cn('AuthorRowLeft')}>
                  <div className={cn('AuthorImgWrapper')}>
                    <Image sizePriority={open ? 'contain' : 'cover'} path={{
                      img: 'ava',
                      project: 'social'
                    }} />
                  </div>
                  <Text className={cn('AuthorName')} children={commentAuthor} size={'1'} />
                </div>
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
                    {answers.map(({ commentAuthor, commentDate, commentDescription, likeCount, disLikeCounts }) => (
                      <div className={cn('AnswerComment')}>
                        <div className={cn('AnswerCommentAuthorRow')}>
                          <div className={cn('AuthorRowLeft')}>
                            <div className={cn('AuthorImgWrapper')}>
                              <Image sizePriority={open ? 'contain' : 'cover'} path={{
                                img: 'ava',
                                project: 'social'
                              }} />
                            </div>
                            <Text className={cn('AuthorName')} children={commentAuthor} size={'1'} />
                          </div>
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
    </div>
  )
})
