import React from 'react'
import { Button } from '@material-ui/core'
import { makeCn } from '@client_shared/utils'

import styles from './NewAddVideos.module.scss'
const cn = makeCn('NewAddVideos', styles)

type NewAddVideosType = {
  videos: any[]
  handleOpenModal: (src: string) => void
}

export const NewAddVideos: React.FC<NewAddVideosType> = React.memo(({ videos, handleOpenModal }) =>
  <div className={cn()}>
    {videos
    .reduce((acc, { data, key }) => ([...acc, data.map((item) => ({ ...item, key }))]), [])
    .flat(1)
    .map(({ id, date, src, name, key }, i) => (
      <Button key={id + date} className={cn('Card')} onClick={() => handleOpenModal(src)}>
        <span className={cn('Number')}>{i + 1}</span>
        <div className={cn('Row')}>
          <div className={cn('Name')}>{name}</div>
          <div className={cn('Key')}>{key}</div>
        </div>
      </Button>
    ))
    }
  </div>
)
