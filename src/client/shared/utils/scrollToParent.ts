import React from 'react'

export const scrollToParent = (el: React.MutableRefObject<HTMLElement>) => {
  const parentElement = el.current.parentElement

  parentElement.scrollTo({
    top: el.current.offsetTop,
    left: el.current.offsetLeft,
    behavior: 'smooth'
  })
}

export const scrollToCurrent = (el: React.MutableRefObject<HTMLElement>) => {
  el?.current.scrollBy({
    top: el.current.scrollHeight,
    behavior: 'smooth'
  })
}
