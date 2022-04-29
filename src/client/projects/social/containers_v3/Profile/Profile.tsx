import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { useReplaceRouterQuery } from '@client_shared/hooks'
import { ProfileLayoutAboutMe, ProfileLayoutDigital, ProfileLayoutWall } from './components'
import { USER } from './../App/data/user'
import { USER_ID } from './../NavBar'
import { PHOTO_ALBUMS } from './data/photoAlbums.data'
import { PHOTO_ITEMS } from './data/photoItems.data'
import { VIDEO_ITEMS } from './data/videoItems.data'
import { VIDEO_ALBUMS } from './data/videoAlbums.data'
import styles from './Profile.module.scss'
import { IconButton } from '@client/shared/components/IconButton'


const cn = makeCn('Profile', styles)

const variants = {
  enter: (direction: 'left' | 'right') => {
    return {
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: 'left' | 'right') => {
    return {
      zIndex: 0,
      x: direction === 'left' ? 1000 : -1000,
      opacity: 0
    }
  }
}


export enum PROFILE_LAYOUTS {
  WALL = 'wall',
  PHOTO = 'photo',
  VIDEO = 'video',
  WORK = 'work',
  ABOUT_ME = 'about_me'
}

const TABS = [
  {
    id: 1,
    activeLayout: PROFILE_LAYOUTS.ABOUT_ME,
    title: 'Обо мне'
  },
  {
    id: 2,
    activeLayout: PROFILE_LAYOUTS.WALL,
    title: 'Стена'
  },
  {
    id: 3,
    activeLayout: PROFILE_LAYOUTS.PHOTO,
    title: 'Фото'
  },
  {
    id: 4,
    activeLayout: PROFILE_LAYOUTS.VIDEO,
    title: 'Видео'
  },
  {
    id: 5,
    activeLayout: PROFILE_LAYOUTS.WORK,
    title: 'Работа'
  }
]


export const Profile: React.FC = React.memo(() => {
  const {
    friends: userFriends
  } = USER
  const { query } = useRouter()

  const checkWall = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.WALL })
  const checkVideo = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.VIDEO })
  const checkPhoto = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.PHOTO })
  const checkWork = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.WORK })
  const checkAboutMe = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.ABOUT_ME })

  const [direction, setDirection] = useState<'left' | 'right'>(null)
  const [currentI, setCurrentI] = useState<number>(null)

  useEffect(() => {
    if (!query.layout) return

    const a = query.layout
    const b = TABS.find(({ activeLayout }) => activeLayout === a).id

    if (b > currentI) {
      setDirection('right')
    }
    if (b < currentI) {
      setDirection('left')
    }
    setCurrentI(b)

  }, [query, currentI])

  const animation = useMemo(() => ({
    key: query.layout,
    custom: direction,
    variants: variants,
    initial: 'enter',
    animate: 'center',
    exit: 'exit',
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 }
    }
  }), [variants, query, direction])


  const actions = useMemo(() => ({
    wall: checkWall,
    video: checkVideo,
    photo: checkPhoto,
    work: checkWork,
    about_me: checkAboutMe
  }), [])

  const tabs = useMemo(() => ({
    wall: (
      <ProfileLayoutWall userId={USER_ID} />
    ),
    video: (
      <ProfileLayoutDigital
        allItems={VIDEO_ITEMS}
        userId={USER_ID}
        albums={VIDEO_ALBUMS}
      />
    ),
    photo: (
      <ProfileLayoutDigital
        allItems={PHOTO_ITEMS}
        userId={USER_ID}
        albums={PHOTO_ALBUMS}
        animation={animation}
      />
    ),
    about_me: (
      <ProfileLayoutAboutMe
        userInfo={USER}
        animation={animation}
      />
    ),
    work: <div>work</div>
  }), [USER_ID, VIDEO_ITEMS, VIDEO_ALBUMS, PHOTO_ITEMS, PHOTO_ALBUMS, USER, animation])

  /**
   * По умолчанию открыта стена
   */
  useEffect(() => {
    if (!query.layout) {
      checkWall()
    }
  }, [query])


  const handleChangeLeft = useCallback(() => {
    if (!currentI) return
    if (currentI >= TABS.length) return
    return actions[TABS.find(({ id }) => id === currentI + 1).activeLayout]()
  }, [currentI, TABS, actions])

  const handleChangeRight = useCallback(() => {
    if (!currentI) return
    if (currentI <= 1) return
    return actions[TABS.find(({ id }) => id === currentI - 1).activeLayout]()
  }, [currentI, TABS, actions])

  return (
    <div className={cn()}>
      <div className={cn('ChangeLayoutButtonsLeft')}>
        <IconButton
          icon={'chevron-left'}
          onClick={handleChangeRight}
          size={'medium'}
        />
      </div>

      <div className={cn('TabButtons')}>
        {TABS.map(({ activeLayout, title, id }) => (
          <Text
            key={id}
            size={'4'}
            textTransform={'uppercase'}
            data-active={query.layout === activeLayout}
            onClick={actions[activeLayout]}
            children={title}
          />
        ))}
      </div>
      <div className={cn('Container')}>
        <AnimatePresence initial={false}>
          {tabs[query.layout as PROFILE_LAYOUTS]}
        </AnimatePresence>
      </div>
      <div className={cn('ChangeLayoutButtonsRight')}>
        <IconButton
          icon={'chevron-right'}
          onClick={handleChangeLeft}
          size={'medium'}
        />
      </div>
    </div>
  )
})
