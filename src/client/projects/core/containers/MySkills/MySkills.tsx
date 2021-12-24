import React, { FC } from 'react'
import { makeCn } from '@shared/utils'
import styles from './MySkills.module.scss'
import { HoneycombMesh } from '~client/projects/core/components/HoneycombMesh'
import { IconName } from '~public/models/icon.model'
import { useQuery } from '@apollo/client'
import { appQueries } from '~client/projects/core/graphql/appQueries'
import { SpecialtyType } from '../App'
import { ResponseApi } from '@shared/components/ResponseApi'


const cn = makeCn('MySkills', styles)


interface MySkillsType {
  el: (icon: IconName, spec?: SpecialtyType) => JSX.Element
}

export const MySkills: FC<MySkillsType> = ({ el }) => {
  const {
    data: { findAllSkills = [] } = {},
    loading,
    error
  } = useQuery(appQueries.FIND_SKILLS)

  return (
    <div className={cn()}>
      <ResponseApi status={[loading]} errors={[error]}>
        <HoneycombMesh
          className={cn('Mesh')}
          othersElements={el('honeycomb')}
          userElements={[
            ...findAllSkills.map(({ position, specialty, name }) => ({
              position,
              element: el(name, specialty)
            }))
          ]}
        />
      </ResponseApi>
    </div>
  )
}
