import { createContext } from 'react'
import { ModalContext } from './model'

export const Context = createContext<ModalContext>({
  size: 'medium',
})
