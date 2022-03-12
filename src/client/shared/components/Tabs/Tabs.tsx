import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'

import { Icon } from '@client_shared/components/Icon'
import { makeCn } from '@client_shared/utils'

import { TabsType } from './types/tabs'
import styles from './Tabs.module.scss'
import { classnames } from '@bem-react/classnames'

const cn = makeCn('Tabs', styles)

SwiperCore.use([Navigation])


export const Tabs: React.FC<TabsType> = React.memo((
  { elements, countVisibleTabs, isArrow, afterTabs, beforeTabs, classNameLine }
) => {
  const [selectedTab, setSelectedTab] = useState(elements[0])
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)

  return (
    <div className={cn()}>
      <nav style={{ position: 'relative' }}>
        {isArrow && (
          <div className={cn('ButtonsRow')}>
            <span className={cn('Buttons')} ref={(node) => setPrevEl(node)}>
             <Icon icon={'arrow-left-sharp'} />
            </span>
            <span className={cn('Buttons')} ref={(node) => setNextEl(node)}>
              <Icon icon={'arrow-right-sharp'} />
            </span>
          </div>
        )}
        <ul className={cn('Ul')}>
          {beforeTabs}
          <Swiper
            navigation={{ prevEl, nextEl }}
            className={cn('Slider')}
            slidesPerView={countVisibleTabs}
          >
            {elements.map((item) => {
              return (
                <SwiperSlide
                  key={item.key}
                  className={cn('Slide', { selected: item.key === selectedTab.key})}
                  onClick={() => setSelectedTab(item)}
                >
                  {item.button}
                  {(item.key === selectedTab.key) && (
                    <motion.div className={classnames(cn('Line'), classNameLine)} layoutId='underline' />
                  )}
                </SwiperSlide>
              )
            })}
          </Swiper>
          {afterTabs}
        </ul>
      </nav>
      <main>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className={cn('Container')}
            key={selectedTab ? selectedTab.key : 'empty'}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            {selectedTab && selectedTab.content}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
})

Tabs.defaultProps = {
  countVisibleTabs: 3
}
