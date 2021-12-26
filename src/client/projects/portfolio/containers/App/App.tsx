import React from 'react'
import { MenuApp } from '~client/projects/portfolio/containers/AppMenu'
import { InfoAboutMe } from '../InfoAboutMe'
import { InfoAboutMySkills } from '../InfoAboutMySkills'


export const App = () => {
  /**
   * В более крупном проекте вместо условных Header, Body и Footer будут глобальные контейнеры на которые разбита страница
   * Контейнер - это только обертка, HOC
   * Контейнер необходим, чтобы разделять файлы проекта по смыслу
   * Каждый контейнер состоит из отдельных компонентов (имеющих отношение только к нему)
   */
  return (
    <>
      <MenuApp />
      <InfoAboutMe />
      <InfoAboutMySkills />
      {/*<div className={cn('PersonContainer')}>*/}
      {/*  <div className={cn('Person')} />*/}
      {/*</div>*/}
    </>
  )
}
