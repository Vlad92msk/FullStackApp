import React, { FC } from 'react'
import { makeCn } from '@shared/utils'
import styles from './MySkills.module.scss'
import { HoneycombMesh } from '~client/modules/core/components/HoneycombMesh'
import { IconName } from '~public/models/icon.model'
import { ApolloError, useQuery } from '@apollo/client'
import { SkillsQueryModel } from '~client/modules/core/types/appQueryModel'
import { appQueries } from '~client/modules/core/graphql/queries'
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
  } = useQuery<SkillsQueryModel>(appQueries.FIND_SKILLS)

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
