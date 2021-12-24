import React, { useMemo, useState } from 'react'
import { makeCn } from '@shared/utils'
import { Page } from '@shared/components/page'
import { Title } from '@shared/components/Title'
import { Text } from '@shared/components/Text'
import { Icon } from '@shared/components/Icon'
import { IconName } from '~public/models/icon.model'

import { MenuApp } from '~client/projects/core/containers/AppMenu'
import { AboutMe } from '~client/projects/core/containers/AboutMe'
import { MySkills } from '~client/projects/core/containers/MySkills'
import { MyProjects } from '~client/projects/core/containers/MyProjects'

import styles from './App.module.scss'

const cn = makeCn('Application', styles)

export type SpecialtyType = 'backend' | 'frontend' | 'other'


export const App = () => {
  const [specialty, setSpecialty] = useState<SpecialtyType>('other')
  const el = useMemo(() => (icon: IconName, spec?: SpecialtyType) => (
    <Icon
      icon={icon}
      fill={'light100'}
      className={cn('IconSkill', spec && { active: specialty === spec })}
      onMouseEnter={
        spec === 'frontend' ? () => setSpecialty('frontend') :
          spec === 'backend' ? () => setSpecialty('backend') :
            () => setSpecialty('other')}
      onMouseLeave={() => setSpecialty('other')}
    />
  ), [specialty])

  return (
    <Page>
      <div className={cn()}>
        <MenuApp />
        <div className={cn('Container')}>
          <AboutMe />
          <MyProjects />
        </div>
        <div className={cn('Container')}>
          <Title className={cn('Title')} size={'1'}>
            Умения и навыки
          </Title>
          <MySkills el={el} />
          <div className={cn('SpecialtyText')}>
            <Text color={'body'} size={'extraLarge'} textTransform={'uppercase'}>
              {specialty}
            </Text>
          </div>
        </div>
        <div className={cn('PersonContainer')}>
          <div className={cn('Person')} />
        </div>
      </div>
    </Page>
  )
}
