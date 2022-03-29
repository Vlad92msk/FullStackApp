import React, { useEffect, useState } from 'react'
import { useAnimation } from 'framer-motion'
import { ControlsAnimationDefinition } from 'framer-motion/types/animation/types'

const openEl: ControlsAnimationDefinition = {
  position: 'fixed',
  left: '0%',
  top: '0%',
  width: '100%',
  height: '100%',
  padding: '5%',
  background: '#202538'
}


export const useMainAnim = (open: boolean, ref: React.MutableRefObject<HTMLDivElement>) => {
  const currentElement = ref?.current
  const currentElementRect = currentElement?.getBoundingClientRect()

  const animate = useAnimation()
  const [initial, setInitial] = useState(null)

  useEffect(() => {
    if (!Boolean(initial) && currentElement) {
      setInitial({
        left: currentElementRect.left,
        top: currentElementRect.top,
        width: currentElementRect.width,
        height: currentElementRect.height,
        padding: '0%',
        zIndex: 10,
        position: 'fixed',
        background: null
      })
    }
  }, [currentElement, initial])

  useEffect(() => {
    if (open === null || !initial) {
      return
    }

    if (open) {
      animate.start(initial, { duration: .1 })

      animate.start(openEl, { duration: 2, delay: .1 })
    }

    if (!open) {
      animate.start({
        position: 'fixed',
        left: ref?.current?.offsetLeft,
        top: ref?.current?.offsetTop,
        width: ref?.current?.offsetWidth,
        height: ref?.current?.offsetHeight,
        padding: '5%',
        zIndex: 10,
      }, { duration: .1 })

      animate.start(initial, { duration: 2, delay: .1 })

      animate.start({
        position: null,
        zIndex: null,
        background: null
      }, { delay: 2, duration: .1 })


    }
  }, [animate, open, ref, initial])

  return animate
}
