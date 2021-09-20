import React, { FC } from 'react'
import { makeCn } from '@shared/utils'
import styles from './MyProjects.module.scss'
import { HoneycombMesh } from '~client/modules/core/components/HoneycombMesh'
import { IconName } from '~public/models/icon.model'
import { SpecialtyType } from '~client/modules/core/containers/App'


const cn = makeCn('MyProjects', styles)


interface MyProjectsType {
  el: (icon: IconName, spec?: SpecialtyType) => JSX.Element
}

export const MyProjects: FC<MyProjectsType> = ({ el }) => {

  return (
    <div className={cn()}>
      <HoneycombMesh
        className={cn('Mesh')}
        row={2}
        column={2}
        othersElements={el('honeycomb')}
        userElements={[
          {
            position: 1,
            element: el('projects-button')
          },
          {
            position: 2,
            element: el('cosmo-button')
          }
        ]}
      />
    </div>
  )
}
