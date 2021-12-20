import React from 'react'
import { Icon } from '@shared/components/Icon'
import { IconButton } from '@shared/components/IconButton'
import { makeCn } from '@shared/utils'
import styles from './VideoFilters.module.scss'

const cn = makeCn('Filters', styles)

type VideoFiltersType = {
  handleSort: (sortParam: ('date' | 'name'), type: ('asc' | 'desc')) => void
}

export const VideoFilters: React.FC<VideoFiltersType> = React.memo(({ handleSort }) =>
  <div className={cn()}>
    <div className={cn('Title')}>Сортировать</div>
    <div className={cn('Item')}>
      <Icon icon={'calendar'} className={cn('Icon')} />
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
      <Icon icon={'clock'} className={cn('Icon')} />
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
  </div>
)
