import React, { useMemo, useState } from 'react'

import { useFindInterfaceQuery } from '@client_projects/gql-generated-hooks'
import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { Icon } from '@client_shared/components/Icon'
import { IconName } from '@client_public/models/icon.model'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { MySkills } from './components'

import styles from './InfoAboutMySkills.module.scss'
const cn = makeCn('InfoAboutMySkills', styles)


export type SpecialtyType = 'backend' | 'frontend' | 'other'


export const InfoAboutMySkills: React.FC = () => {
  const [specialty, setSpecialty] = useState<SpecialtyType>('other')

  const {
    data: {
      userInterfacePortfolioFindAll: userInterface
    } = {},
    loading,
    error
  } = useFindInterfaceQuery()

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
      <ResponseApi status={[loading]} errors={[error]}>
        {() => <>
          <Text className={cn('Title')} size={'8'} color={'title'} children={userInterface.skillsAndAbilities} />
          <MySkills el={el} />
          <div className={cn('SpecialtyText')}>
            <Text color={'body'} size={'8'} textTransform={'uppercase'} children={specialty} />
          </div>
        </>}
      </ResponseApi>
    </div>
  )
}
