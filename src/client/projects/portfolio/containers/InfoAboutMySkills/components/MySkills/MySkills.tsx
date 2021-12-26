import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import { makeCn } from '@shared/utils'
import { appQueries } from '~client/projects/portfolio/graphql/appQueries'
import { HoneycombMesh } from '@shared/components/HoneycombMesh'
import { ResponseApi } from '@shared/components/ResponseApi'
import styles from './MySkills.module.scss'


const cn = makeCn('MySkills', styles)


interface MySkillsType {
  el: (...args) => JSX.Element
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
