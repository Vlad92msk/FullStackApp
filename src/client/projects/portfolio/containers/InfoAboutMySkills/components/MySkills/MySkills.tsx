import React, { FC } from 'react'

import { makeCn } from '@client_shared/utils'
import { useFindAllSkillsQuery } from '@client_projects/gql-generated-hooks'
import { HoneycombMesh } from '@client_shared/components/HoneycombMesh'
import { ResponseApi } from '@client_shared/components/ResponseApi'

import styles from './MySkills.module.scss'
const cn = makeCn('MySkills', styles)


interface MySkillsType {
  el: (...args) => JSX.Element
}

export const MySkills: FC<MySkillsType> = ({ el }) => {
  const { loading, data: { findAllSkills } = {}, error } = useFindAllSkillsQuery()

  return (
    <div className={cn()}>
      <ResponseApi status={[loading]} errors={[error]}>
        {() => <HoneycombMesh
          className={cn('Mesh')}
          othersElements={el('honeycomb')}
          userElements={findAllSkills?.map(({ position, specialty, name }) => ({
            position,
            element: el(name, specialty)
          }))
          }
        />}
      </ResponseApi>
    </div>
  )
}
