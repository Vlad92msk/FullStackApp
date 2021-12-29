import React from 'react'
import { MenuApp } from '~client/projects/portfolio/containers/AppMenu'
import { InfoAboutMe } from '../InfoAboutMe'
import { InfoAboutMySkills } from '../InfoAboutMySkills'
import { Person } from '../Person'
import { Section } from '@shared/components/Section'
import { makeCn } from '@shared/utils'
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
