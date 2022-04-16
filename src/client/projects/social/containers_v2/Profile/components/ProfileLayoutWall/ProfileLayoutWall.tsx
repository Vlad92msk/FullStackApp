import React, { useCallback, useState } from 'react'
import { makeCn } from '@client_shared/utils'
import { IconButton } from '@client/shared/components/IconButton'
import { WALL_RECORDS } from '../../data/walls.data'
import { WallRecord } from '../../components'
import styles from './ProfileLayoutWall.module.scss'


const cn = makeCn('ProfileLayoutWall', styles)

type ProfileLayoutWallType = {
  userId: number
}

/**
 * Раздел Профиля - Контент-компонет для Видео или Фото
 */
export const ProfileLayoutWall: React.FC<ProfileLayoutWallType> = React.memo((props) => {
  const { userId } = props

  const [records, setRecords] = useState(WALL_RECORDS)


  return (
    <div className={cn()}>
      <div className={cn('CreateRecord')}>
        <div className={cn('Attach')}>
          <IconButton icon={'attachment'} size={'small'} fill={'oldAsphalt50'} />
        </div>
        <div className={cn('Input')}>
          <input />
        </div>
        <div className={cn('Smile')}>
          <IconButton icon={'smile'} size={'small'} fill={'oldAsphalt50'} />
        </div>
      </div>
      <div className={cn('Records')}>
        {
          records.map((record) => (
            <WallRecord key={record.id} record={record} />
          ))
        }
      </div>
    </div>
  )
})
