import React from 'react'

import { MenuApp } from '@client_projects/portfolio/containers/AppMenu'
import { Section } from '@client_shared/components/Section'
import { makeCn } from '@client_shared/utils'
import { InfoAboutMe } from '../InfoAboutMe'
import { InfoAboutMySkills } from '../InfoAboutMySkills'
import { Person } from '../Person'

import styles from './App.module.scss'
const cn = makeCn('Application', styles)

export const App = () => {
  /**
   * В более крупном проекте вместо условных Profile, Body и Footer будут глобальные контейнеры на которые разбита страница
   * Контейнер - это только обертка, HOC
   * Контейнер необходим, чтобы разделять файлы проекта по смыслу
   * Каждый контейнер состоит из отдельных компонентов (имеющих отношение только к нему)
   */
  return (
    <Section className={cn()} imgClassName={cn('Img')} bcgImg={{
      path: {
        img: 'bcg',
        project: 'portfolio'
      },
    }}>
      <MenuApp />
      <InfoAboutMe />
      <InfoAboutMySkills />
      <Person />
    </Section>
  )
}
