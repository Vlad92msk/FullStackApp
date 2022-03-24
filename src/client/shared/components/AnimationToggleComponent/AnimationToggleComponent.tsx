import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, Transition, useAnimation } from 'framer-motion'
import { ControlsAnimationDefinition } from 'framer-motion/types/animation/types'
import { classnames } from '@bem-react/classnames'

type AnimateParams = {
  animate: ControlsAnimationDefinition,
  transitionOverride?: Transition
}

export type AnimationToggleComponentType = {
  className?: string
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
  setRef?: (ref: React.MutableRefObject<HTMLDivElement>) => void
  animations?: {
    active: AnimateParams[],
    close: AnimateParams[]
  }
};

export const AnimationToggleComponent: React.FC<AnimationToggleComponentType> = React.memo((
  {
    children,
    className,
    setRef,
    onMouseLeave,
    onMouseEnter,
    animations
  }) => {
  const ref = useRef<HTMLDivElement>(null)
  const animate = useAnimation()

  const [open, setOpen] = useState(null)
  const handleToggle = useCallback(() => setOpen(prev => !prev), [])

  const [{ active, close }, setAnim] = useState(animations || { active: [], close: [] })

  /**
   * Если не передали анимации, то устанавливаем по умолчанию
   */
  useEffect(() => {
    if (ref && !animations) {
      setAnim({
        active: [
          {
            animate: {
              position: 'fixed',
              top: ref?.current?.offsetTop,
              left: ref?.current?.offsetLeft,
              zIndex: 10
            },
            transitionOverride: { duration: .1 }
          },
          {
            animate: { top: '1%', left: '1%' },
            transitionOverride: { delay: .1, duration: 2 }
          }
        ],
        close: [
          {
            animate: {
              position: 'fixed',
              top: 'auto',
              left: 'auto',
              zIndex: 10
            },
            transitionOverride: { duration: 2 }
          },
          {
            animate: {
              position: null,
              zIndex: null
            },
            transitionOverride: { delay: 2 }
          }
        ]
      })
    }
  }, [ref])

  useEffect(() => {
    setRef?.(ref)
  }, [ref])

  useEffect(() => {
    if (open === null) {
      return
    }
    if (open) {
      active.map((userAnimate) => animate.start(userAnimate.animate, userAnimate?.transitionOverride))
    }
    if (!open) {
      close.map((userAnimate) => animate.start(userAnimate.animate, userAnimate?.transitionOverride))
    }
  }, [open, animate])

  return (
    <motion.div
      ref={ref}
      onClick={handleToggle}
      animate={animate}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classnames(className)}
    >
      {children}
    </motion.div>
  )
})
