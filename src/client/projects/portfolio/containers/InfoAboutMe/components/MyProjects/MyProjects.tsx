import React, { FC, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'

import { makeCn } from '@client_shared/utils'
import { Icon } from '@client_shared/components/Icon'
import { Text } from '@client_shared/components/Text'
import { HoneycombMesh } from '@client_shared/components/HoneycombMesh'
import { ROUTES_ALL } from '@client_projects/routesAll'
import { ProjectLanguage } from '@client_pages/_app'

import styles from './MyProjects.module.scss'
const cn = makeCn('MyProjects', styles)


export const MyProjects: FC = () => {
  const router = useRouter()
  const { language } = useContext(ProjectLanguage)

  const handleGoCosmo = useCallback(() => {
    ROUTES_ALL && router.push(`/${language}/${ROUTES_ALL.COSMO}`)
  }, [router, language])

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
