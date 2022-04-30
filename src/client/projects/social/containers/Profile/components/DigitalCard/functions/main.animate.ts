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
  background: '#202538',
  zIndex: 10
}

export const initialEl = {
  position: null,
  zIndex: null,
  background: null,
  width: null,
  height: null,
  left: null,
  top: null,
  padding: null
}

export const useMainAnim = (open: boolean, ref: React.MutableRefObject<HTMLDivElement>) => {
  const currentElement = ref?.current
  const animate = useAnimation()
  const [initial, setInitial] = useState(null)

  useEffect(() => {
    if (!Boolean(initial) && currentElement) {
      setInitial({
        left: currentElement.offsetLeft,
        top: currentElement.offsetTop,
        width: currentElement.offsetWidth,
        height: currentElement.offsetHeight,
        padding: '0%',
        zIndex: 10,
        position: 'fixed'
      })
    }
  }, [currentElement, initial])

  const start = async () => {
    await animate.start(initial, { duration: .1 })
    await animate.start(openEl, { duration: 2, delay: .1 })
  }
  const off = async () => {
    await animate.start(openEl, { duration: .1 })
    await animate.start(initial, { duration: 2, delay: .1 })

    await animate.start(initialEl, { duration: .1 })
  }

  useEffect(() => {
    if (open === null || !initial) return
    if (open) {
      start().then(r => r)
    }
    if (!open) {
      off().then(r => r)
    }
  }, [open, initial])

  return animate
}
