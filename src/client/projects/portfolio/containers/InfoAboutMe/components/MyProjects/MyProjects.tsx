import React, { FC } from 'react'

import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { HoneycombMesh } from '@client_shared/components/HoneycombMesh'
import { useRouterPush } from '@client_shared/hooks/useRouterPush'
import { ROUTES_ALL } from '@client_projects/routesAll'

import styles from './MyProjects.module.scss'
const cn = makeCn('MyProjects', styles)


export const MyProjects: FC = () => {
  const handleGoCosmo = useRouterPush(ROUTES_ALL.COSMO)
  const handleGoSocial = useRouterPush(ROUTES_ALL.SOCIAL)


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
        },
        {
          position: 4,
          element: <Icon
            icon={'social-vk'}
            fill={'light100'}
            className={cn('Icon')}
            onClick={handleGoSocial}
          />
        }
      ]}
    />
  </div>
}
