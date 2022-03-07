import React from 'react'

export const scrollTo = (el: React.MutableRefObject<HTMLElement>) => {
  const parentElement = el.current.parentElement

  parentElement.scrollTo({
    top: el.current.offsetTop,
    left: el.current.offsetLeft,
    behavior: 'smooth'
  })
}
