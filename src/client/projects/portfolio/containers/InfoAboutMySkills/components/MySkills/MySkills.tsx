import React, { FC } from 'react'
import { makeCn } from '@shared/utils'
import { useFindAllSkillsQuery } from '~client/projects/gql-generated-hooks'
import { HoneycombMesh } from '@shared/components/HoneycombMesh'
import { ResponseApi } from '@shared/components/ResponseApi'
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
