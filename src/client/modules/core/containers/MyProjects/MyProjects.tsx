import React, { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import { makeCn } from '@shared/utils'
import { HoneycombMesh } from '~client/modules/core/components/HoneycombMesh'
import { Icon } from '@shared/components/Icon'
import styles from './MyProjects.module.scss'
import { ROUTES_PORTFOLIO } from '~client/modules/core/router'

const cn = makeCn('MyProjects', styles)

export const MyProjects: FC = () => {
  const router = useRouter()
  const handleProjectCheck = useCallback((page: keyof typeof ROUTES_PORTFOLIO) => router.push(ROUTES_PORTFOLIO[page].page), [router])

  return <div className={cn()}>
    <HoneycombMesh
      className={cn('Mesh')}
      row={2}
      column={2}
      othersElements={<Icon
        icon={'honeycomb'}
        fill={'light100'}
        className={cn('Icon')}
      />}
      userElements={[
        {
          position: 1,
          element: <Icon
            icon={'projects-button'}
            fill={'light100'}
            className={cn('Icon')}
          />
        },
        {
          position: 2,
          element: <Icon
            icon={'cosmo-button'}
            fill={'light100'}
            className={cn('Icon')}
            onClick={() => handleProjectCheck('cosmo')}
          />
        }
      ]}
    />
  </div>
}
