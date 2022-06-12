import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'

import { Text } from '@client_shared/components/Text'
import { makeCn } from '@client_shared/utils'
import { useReplaceRouterQuery } from '@client_shared/hooks'
import { IconButton } from '@client/shared/components/IconButton'
import { DefaultObject } from '@client/public/models/defaultObject.model'
import styles from './ProfileContainer.module.scss'


const cn = makeCn('ProfileContainer', styles)


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

const variants = {
  enter: (direction: 'left' | 'right') => {
    return {
      transform: direction === 'right' ? 'translateX(1000px)' : 'translateX(-1000px)'
    }
  },
  center: {
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    transform: 'translateX(0px)',
    filter: 'blur(0px)'
  },
  exit: {
    filter: 'blur(4px)',
    transform: 'translateX(0px)'
  }
}

type ProfileContainerProps = {
  tabs: DefaultObject<any>
  tabActions: DefaultObject<any>
}
export const ProfileContainer: React.FC<ProfileContainerProps> = React.memo((props) => {
  const { tabs, tabActions } = props
  const { query } = useRouter()

  const checkWall = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.WALL }, ['isEditing'])
  const checkVideo = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.VIDEO }, ['isEditing'])
  const checkPhoto = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.PHOTO }, ['isEditing'])
  const checkWork = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.WORK }, ['isEditing'])
  const checkAboutMe = useReplaceRouterQuery({ layout: PROFILE_LAYOUTS.ABOUT_ME }, ['isEditing'])

  const [currentI, setCurrentI] = useState<number>(null)

  const [direction, setDirection] = useState<'left' | 'right'>(null)
  const animation: any = useMemo(() => ({
    key: query.layout,
    custom: direction,
    variants: variants,
    initial: 'enter',
    animate: 'center',
    exit: 'exit',
    transition: {
      duration: .5
    }
  }), [variants, query, direction])

  useEffect(() => {
    if (!query.layout) return

    const activeTabId = TABS.find(({ activeLayout }) => activeLayout === query.layout)?.id

    if (activeTabId > currentI) {
      setDirection('right')
    }
    if (activeTabId < currentI) {
      setDirection('left')
    }
    setCurrentI(activeTabId)
  }, [query, currentI])


  const tabsChangeLayout = useMemo(() => ({
    wall: checkWall,
    video: checkVideo,
    photo: checkPhoto,
    work: checkWork,
    about_me: checkAboutMe
  }), [])


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
    return tabsChangeLayout[TABS.find(({ id }) => id === currentI + 1).activeLayout]()
  }, [currentI, TABS, tabsChangeLayout])
  const handleChangeRight = useCallback(() => {
    if (!currentI) return
    if (currentI <= 1) return
    return tabsChangeLayout[TABS.find(({ id }) => id === currentI - 1).activeLayout]()
  }, [currentI, TABS, tabsChangeLayout])

  return (
    <div className={cn()}>
      <div className={cn('TabButtons')}>
        {TABS.map(({ activeLayout, title, id }) => (
          <Text
            key={id}
            size={'4'}
            textTransform={'uppercase'}
            data-active={query.layout === activeLayout}
            onClick={tabsChangeLayout[activeLayout]}
            children={title}
          />
        ))}
      </div>
      <div className={cn('Container')}>
        <div className={cn('ChangeLayoutButtonsLeft')}>
          <IconButton
            icon={'chevron-left'}
            onClick={handleChangeRight}
            size={'medium'}
          />
        </div>
        <AnimatePresence initial={false}>
          <motion.div {...animation} style={{ width: '100%', position: 'absolute' }}>
            {tabs[query.layout as PROFILE_LAYOUTS]}
          </motion.div>
        </AnimatePresence>
        <div className={cn('ChangeLayoutButtonsRight')}>
          <IconButton
            icon={'chevron-right'}
            onClick={handleChangeLeft}
            size={'medium'}
          />
          <div className={cn('Actions')}>
            {tabActions[query.layout as PROFILE_LAYOUTS]}
          </div>
        </div>
      </div>
    </div>
  )
})
