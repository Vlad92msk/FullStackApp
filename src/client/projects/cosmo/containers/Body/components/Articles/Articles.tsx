import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, EffectCoverflow } from 'swiper/core'

import { makeCn } from '@client_shared/utils'
import { Section } from '@client_shared/components/Section'
import { createString } from '@client_shared/utils/createString'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { Text } from '@client_shared/components/Text'
import { useArticlesFindAllQuery, useCosmoInterfaceQuery } from '@client_projects/gql-generated-hooks'
import { CosmoPages } from '@client_projects/cosmo/router'
import { section } from '@client_projects/cosmo/moduleGeneralCN'

import styles from './Articles.module.scss'

const cn = makeCn('Articles', styles)
SwiperCore.use([Pagination, EffectCoverflow])


type ArticlesType = {}

export const Articles: React.FC<ArticlesType> = () => {
  const router = useRouter()

  /**
   * Интерфейс
   */
  const {
    data: { userInterfaceCosmoFindAll: userInterface } = {},
    loading: userInterfaceLoading,
    error: userInterfaceError
  } = useCosmoInterfaceQuery()

  /**
   * Статьи
   */
  const {
    data: { articlesFindAll = [] } = {},
    loading: articlesFindAllLoading,
    error: articlesFindAllError
  } = useArticlesFindAllQuery()

  /**
   * Формирует URL и переходит по нему
   */
  const onOpenArticle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    router.push(createString([router.query.lang, CosmoPages.COSMO, CosmoPages.ARTICLES, e.currentTarget.id], '/'))
  }, [router])

  return (
    <Section className={section()} noPaddingRight noPaddingLeft>
      <div className={cn()}>
        <ResponseApi
          status={[articlesFindAllLoading, userInterfaceLoading]}
          errors={[articlesFindAllError, userInterfaceError]}
        >
          {() => <>
            <Text
              className={cn('Title')}
              as={'h2'}
              size={'7'}
              textTransform={'uppercase'}
              children={userInterface.articles}
            />
            <Swiper
              className={cn('Slider')}
              effect={'coverflow'}
              centeredSlides={true}
              slidesPerView={5}
              coverflowEffect={{
                rotate: 50,
                stretch: 5,
                depth: 100,
                modifier: 1,
                slideShadows: true
              }}
            >
              {articlesFindAll.map(({ id, title }) => (
                <SwiperSlide
                  className={cn('Slide')}
                  key={id}
                  id={String(id)}
                  onClick={onOpenArticle}
                >
                  <div className={cn('Item')}>
                    <div className={cn('ItemImg')}>img</div>
                    <Text as={'h3'} className={cn('ItemTitle')}>{title}</Text>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>}
        </ResponseApi>
      </div>
    </Section>
  )
}
