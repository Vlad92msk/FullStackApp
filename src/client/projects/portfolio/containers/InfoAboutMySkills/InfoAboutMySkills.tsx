import React, { useMemo, useState } from 'react'
import { makeCn } from '@shared/utils'
import { Text } from '@shared/components/Text'
import { Icon } from '@shared/components/Icon'

import { MySkills } from './components'
import { IconName } from '~public/models/icon.model'
import styles from './InfoAboutMySkills.module.scss'
const cn = makeCn('InfoAboutMySkills', styles)


export type SpecialtyType = 'backend' | 'frontend' | 'other'


export const InfoAboutMySkills: React.FC = () => {
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
    <div className={cn()}>
      <Text className={cn('Title')} size={'8'} color={'title'} children={' Умения и навыки'} />
      <MySkills el={el} />
      <div className={cn('SpecialtyText')}>
        <Text color={'body'} size={'8'} textTransform={'uppercase'} children={specialty} />
      </div>
    </div>
  )
}
