import React, { useCallback, useEffect, useState } from 'react'
import lodash from 'lodash'
import { classnames } from '@bem-react/classnames'

import { Tabs } from '@client_shared/components/Tabs'
import { Modal } from '@client_shared/components/Modal'
import { Text } from '@client_shared/components/Text'
import { Section } from '@client_shared/components/Section'
import { useBooleanState } from '@client_shared/hooks'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { makeCn } from '@client_shared/utils'
import { useCosmoInterfaceQuery } from '@client_projects/gql-generated-hooks'
import { section } from '@client_projects/cosmo/moduleGeneralCN'
import { VideoFilters, NewAddVideos } from '../../components'

import styles from './VideoContent.module.scss'

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
  },
  {
    id: 2,
    key: 'Тема 2',
    date: [
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
  const [currentTab, setCurrentTab] = React.useState(data[0].key)
  const [open, handleOpen, handleClose] = useBooleanState(false)
  const [openModalVideo, setOpenModalVideo] = useState<string>(null)
  const [videos, setVideos] = useState(data)

  const {
    data: { userInterfaceCosmoFindAll: userInterface } = {},
    loading, error
  } = useCosmoInterfaceQuery()


  useEffect(() => {
    setVideos(data)
  }, [])

  /**
   * Нажатие на Таб
   */
  const handleChange = useCallback((newValue: string) => {
    setCurrentTab(newValue)
  }, [])

  /**
   * Открыть модалку
   */
  const handleOpenModal = useCallback((src: string) => {
    handleOpen()
    setOpenModalVideo(baseUrl + src)
  }, [baseUrl])

  /**
   * Сортировка видео
   */
  const handleSort = useCallback((sortParam: 'date' | 'name', type: 'asc' | 'desc') =>
      setVideos(prev => prev.reduce((acc, item) => {
          return item.key !== currentTab ? [...acc, item] : [...acc, {
            ...item,
            data: lodash.orderBy(item.data, [sortParam], [type])
          }]
        }, [])
      )
    , [currentTab])

  return (
    <Section className={classnames(section())}>
      <div className={cn()}>
        <div className={cn('Main')}>
          <div className={cn('Header')}>
            <Tabs
              elements={videos.map(({ key, data }) => ({
                key: key,
                button: <div onClick={() => handleChange(key)} className={cn('Tab')}>{key}</div>,
                content: <div className={cn('Body')}>
                  <VideoFilters handleSort={handleSort} />
                  {data.map(({ src, id, name }) => (
                    <iframe
                      className={cn('ContentVideo')}
                      key={name + id}
                      src={baseUrl + src}
                      allowFullScreen
                    />
                  ))}
                </div>
              }))}
              afterTabs={(
                <Text
                  size={'4'}
                  textTransform={'uppercase'}
                  className={cn('Video')}
                  children={'video'}
                />
              )}
              classNameLine={cn('TabUnderLine')}
            />
          </div>
        </div>
        <div className={cn('Rating')}>
          <ResponseApi status={[loading]} errors={[error]}>
            {() => <>
              <Text
                size={'3'}
                textTransform={'uppercase'}
                className={cn('Title')}
                children={userInterface.recentlyAdded}
              />
              <NewAddVideos videos={data} handleOpenModal={handleOpenModal} />
            </>}
          </ResponseApi>
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
