import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'

import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { ButtonBox, MButtonBox } from '@client_shared/components/ButtonBox'
import styles from './Profile.module.scss'

const cn = makeCn('Profile', styles)


export const Profile: React.FC = () => {
  const { push, query: { lang, layout } } = useRouter()
  const dwed = useCallback((layout: string) => {
    push({
      query: { lang, layout }
    })
  }, [lang])


  return (
    <div className={cn()}>
      <Text className={cn('Title')} size={'5'} weight={'bold'} textTransform={'uppercase'} children={'Профиль'} />
      <div className={cn('Container')}>

        <div className={cn('Card', { active: layout === 'photo' })}>
          <ButtonBox
            className={cn('CardButton', { active: layout === 'photo' })}
            onClick={() => dwed('photo')}
          >
            <Text
              className={cn('CardTitle')}
              children={'Фото'}
            />
          </ButtonBox>
          {layout === 'photo' && (
            <div className={cn('ContentContainer', { active: layout === 'photo' })}>
              photo
            </div>
          )}
        </div>


        <div className={cn('Card', { active: layout === 'video' })}>
          <ButtonBox
            className={cn('CardButton', { active: layout === 'video' })}
            onClick={() => dwed('video')}
          >
            <Text
              className={cn('CardTitle')}
              children={'video'}
            />
          </ButtonBox>
          {layout === 'video' && (
            <div className={cn('ContentContainer', { active: layout === 'video' })}>
              video
            </div>
          )}
        </div>

        <div className={cn('Card', { active: layout === 'ribbon' })}>
          <ButtonBox
            className={cn('CardButton', { active: layout === 'ribbon' })}
            onClick={() => dwed('ribbon')}
          >
            <Text
              className={cn('CardTitle')}
              children={'ribbon'}
            />
          </ButtonBox>
          {layout === 'ribbon' && (
            <div className={cn('ContentContainer', { active: layout === 'ribbon' })}>
              ribbon
            </div>
          )}
        </div>


        <div className={cn('Card', { active: layout === 'articles' })}>
          <ButtonBox
            className={cn('CardButton', { active: layout === 'articles' })}
            onClick={() => dwed('articles')}
          >
            <Text
              className={cn('CardTitle')}
              children={'articles'}
            />
          </ButtonBox>
          {layout === 'articles' && (
            <div className={cn('ContentContainer', { active: layout === 'articles' })}>
              articles
            </div>
          )}
        </div>

        <div className={cn('Card', { active: layout === 'job' })}>
          <ButtonBox
            className={cn('CardButton', { active: layout === 'job' })}
            onClick={() => dwed('job')}
          >
            <Text
              className={cn('CardTitle')}
              children={'job'}
            />
          </ButtonBox>
          {layout === 'job' && (
            <div className={cn('ContentContainer', { active: layout === 'job' })}>
              job
            </div>
          )}
        </div>

        <div className={cn('Card', { active: layout === 'mentor' })}>
          <ButtonBox
            className={cn('CardButton', { active: layout === 'mentor' })}
            onClick={() => dwed('mentor')}
          >
            <Text
              className={cn('CardTitle')}
              children={'mentor'}
            />
          </ButtonBox>
          {layout === 'mentor' && (
            <div className={cn('ContentContainer', { active: layout === 'mentor' })}>
              mentor
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
