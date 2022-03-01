import React from 'react'

import { Icon } from '@client_shared/components/Icon'
import { IconButton } from '@client_shared/components/IconButton'
import { makeCn } from '@client_shared/utils'
import { Text } from '@client_shared/components/Text'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { useCosmoInterfaceQuery } from '@client_projects/gql-generated-hooks'

import styles from './VideoFilters.module.scss'
const cn = makeCn('Filters', styles)


type VideoFiltersType = {
  handleSort: (sortParam: ('date' | 'name'), type: ('asc' | 'desc')) => void
}


export const VideoFilters: React.FC<VideoFiltersType> = React.memo(({ handleSort }) => {
    const {
      data: { userInterfaceCosmoFindAll: userInterface } = {},
      loading, error
    } = useCosmoInterfaceQuery()


    return <div className={cn()}>
      <ResponseApi status={[loading]} errors={[error]}>
        {() => <>
          <Text size={'3'} className={cn('Title')} children={userInterface.sort} />
          <div className={cn('Item')}>
            <Icon size={'medium'} icon={'calendar'} className={cn('Icon')} />
            <div className={cn('ButtonsBox')}>
              <IconButton
                onClick={() => handleSort('date', 'asc')}
                size={'small'}
                className={cn('Button')}
                icon={'arrow-up-sharp'}
              />
              <IconButton
                onClick={() => handleSort('date', 'desc')}
                size={'small'}
                className={cn('Button')}
                icon={'arrow-down-sharp'}
              />
            </div>
          </div>
          <div className={cn('Item')}>
            <Icon size={'medium'} icon={'clock'} className={cn('Icon')} />
            <div className={cn('ButtonsBox')}>
              <IconButton
                onClick={() => handleSort('name', 'asc')}
                size={'small'}
                className={cn('Button')}
                icon={'arrow-up-sharp'}
              />
              <IconButton
                onClick={() => handleSort('name', 'desc')}
                size={'small'}
                className={cn('Button')}
                icon={'arrow-down-sharp'}
              />
            </div>
          </div>
        </>}
      </ResponseApi>
    </div>
  }
)
