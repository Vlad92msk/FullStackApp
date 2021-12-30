import React, { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import { makeCn } from '@shared/utils'
import { HoneycombMesh } from '~client/shared/components/HoneycombMesh'
import { ROUTES_ALL } from '~client/projects/routesAll'
import { Icon } from '@shared/components/Icon'
import { Text } from '@shared/components/Text'
import styles from './MyProjects.module.scss'

const cn = makeCn('MyProjects', styles)

export const MyProjects: FC = () => {
  const router = useRouter()

  const handleGoCosmo = useCallback(() => {
    ROUTES_ALL && router.push(ROUTES_ALL.COSMO)
  }, [router])

  return <div className={cn()}>
    <Text className={cn('Title')} size={'8'} color={'title'} children={'Проекты'} />
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
            onClick={handleGoCosmo}
          />
        }
      ]}
    />
  </div>
}
