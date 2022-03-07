import React from 'react'

export type Section = {
  section: JSX.Element
  ref: React.MutableRefObject<HTMLElement>
  name?: string
}

export type SectionType = {
  className?: string
  buttonsClassName?: string
  sections: Section[]
  type?: 'horizontal' | 'vertical'
}
