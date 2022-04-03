import React, { useRef } from 'react'
import { Header } from '../Header'
import { Body } from '../Body'
import { Footer } from '../Footer'

import { SectionChange } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)

export const App = () => {
  const header = useRef<HTMLElement>(null);
  const body = useRef<HTMLElement>(null);
  const footer = useRef<HTMLElement>(null);
  /**
   * В более крупном проекте вместо условных UserContent, Body и Footer будут глобальные контейнеры на которые разбита страница
   * Контейнер - это только обертка, HOC
   * Контейнер необходим, чтобы разделять файлы проекта по смыслу
   * Каждый контейнер состоит из отдельных компонентов (имеющих отношение только к нему)
   */
  return (
    <SectionChange className={cn()} sections={[
      { section: <Header />, ref: header },
      { section: <Body />, ref: body },
      { section: <Footer />, ref: footer }
    ]} />
  )
}
