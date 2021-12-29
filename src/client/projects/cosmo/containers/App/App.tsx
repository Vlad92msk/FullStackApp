import React from 'react'
import { Header } from '../Header'
import { Body } from '../Body'
import { Footer } from '../Footer'

import { makeCn } from '@shared/utils'
import { Section } from '@shared/components/Section'
import styles from './App.module.scss'

const cn = makeCn('Application', styles)

export const App = () => {
  /**
   * В более крупном проекте вместо условных Header, Body и Footer будут глобальные контейнеры на которые разбита страница
   * Контейнер - это только обертка, HOC
   * Контейнер необходим, чтобы разделять файлы проекта по смыслу
   * Каждый контейнер состоит из отдельных компонентов (имеющих отношение только к нему)
   */
  return (
    <Section className={cn()}>
      <Header />
      <Body />
      <Footer/>
    </Section>
  )
}
