import { createContext } from 'react'
import { SectionContextType } from './types/sectionContext'

export const SectionContext = createContext<SectionContextType>({
  ref: null,
  scrollTo: null
})
