import React from 'react'

export type SectionContextType = {
  ref: React.MutableRefObject<HTMLElement>
  scrollTo?: (el: React.MutableRefObject<HTMLElement>) => void
}
