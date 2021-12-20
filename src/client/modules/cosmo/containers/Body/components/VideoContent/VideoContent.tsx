import React, { useCallback, useEffect, useState } from 'react'
import { makeCn } from '@shared/utils'
import lodash from 'lodash'

import styles from './VideoContent.module.scss'
import { Tab, Tabs } from '@material-ui/core'
import { Modal } from '@shared/components/Modal'
import { useBooleanState } from '@shared/hooks'
import { VideoFilters, NewAddVideos } from '../../components'
import { classnames } from '@bem-react/classnames'
import { Section } from '@shared/components/Section'
import { section } from '~client/modules/cosmo/moduleGeneralCN'

const cn = makeCn('VideoContent', styles)

const baseUrl = 'https://www.youtube.com/embed/'

const data = [
  {
    id: 1,
    key: 'Тема 1',
    data: [
      {
        id: 1,
        date: '2019-06-28',
        name: 'adc',
        src: 'DFK3xaa2IOo'
      },
      {
        id: 2,
        date: '2019-09-29',
        name: 'b',
        src: 'DFK3xaa2IOo'
      },
      {
        id: 3,
        date: '2019-04-27',
        name: 'c',
        src: 'DFK3xaa2IOo'
      },
      {
        id: 4,
        date: '2019-05-02',
        name: 'd',
        src: 'DFK3xaa3IOo'
      }
    ]
  }

]

export const VideoContent: React.FC = () => {
  const [value, setValue] = React.useState(data[0].key)
  const [open, handleOpen, handleClose] = useBooleanState(false)
  const [openModalVideo, setOpenModalVideo] = useState<string>(null)
  const [videos, setVideos] = useState(data)

  useEffect(() => {
    setVideos(data)
  }, [])


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const handleOpenModal = useCallback((src: string) => {
    handleOpen()
    setOpenModalVideo(baseUrl + src)
  }, [])

  /**
   * Сортировка видео
   */
  const handleSort = useCallback((sortParam: 'date' | 'name', type: 'asc' | 'desc') =>
      setVideos(prev => prev.reduce((acc, item) => {
          return item.key !== value ? [...acc, item] : [...acc, {
            ...item,
            data: lodash.orderBy(item.data, [sortParam], [type])
          }]
        }, [])
      )
    , [value])

  return (
    <Section className={classnames(section())}>
      <div className={cn()}>
        <div className={cn('Main')}>
          <div className={cn('Header')}>
            <Tabs
              className={cn('Tabs')}
              value={value}
              onChange={handleChange}
              variant={'scrollable'}
            >
              {videos.map(({ key, id }) => <Tab className={cn('Tab')} key={key + id} value={key} label={key} />)}
            </Tabs>
            <div className={cn('Video')}>video</div>
          </div>
          <div className={cn('Body')}>
            <VideoFilters handleSort={handleSort} />
            {videos.map(({ data, key }) => (key === value) && data.map(({ src, id, name }) => <iframe
              className={cn('ContentVideo')}
              key={name + id}
              src={baseUrl + src}
              allowFullScreen
            />))}
          </div>
        </div>
        <div className={cn('Rating')}>
          <div className={cn('Title')}>Недавно добавлены</div>
          <NewAddVideos videos={data} handleOpenModal={handleOpenModal} />
        </div>
      </div>
      <Modal open={open} onClose={handleClose} className={cn('Modal')}>
        <iframe
          width={'100%'}
          height={'100%'}
          style={{ border: 0 }}
          src={openModalVideo}
          allowFullScreen
        />
      </Modal>
    </Section>
  )
}
