import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'

import { makeCn } from '@client_shared/utils'
import { Section } from '@client_shared/components/Section'
import { createString } from '@client_shared/utils/createString'
import { useScreenWidth } from '@client_shared/hooks'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { Text } from '@client_shared/components/Text'
import { useArticlesFindAllQuery, useCosmoInterfaceQuery } from '@client_projects/gql-generated-hooks'
import { MediaQueries } from '@client_public/models/mediaQueries'
import { CosmoPages } from '@client_projects/cosmo/router'
import { section } from '@client_projects/cosmo/moduleGeneralCN'

import styles from './Articles.module.scss'
const cn = makeCn('Articles', styles)
SwiperCore.use([Navigation])


type ArticlesType = {}

export const Articles: React.FC<ArticlesType> = () => {
  const screenWidth = useScreenWidth()
  const router = useRouter()

  /**
   * Интерфейс
   */
  const {
    data: { userInterfaceCosmoFindAll: userInterface } = {},
    loading: userInterfaceLoading,
    error: userInterfaceError,
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

  const sliderMediaParam = useMemo(() => {
    return ({
      slidesPerView: Math.round(screenWidth / 450),
      spaceBetween: 30
    })
  }, [screenWidth])

  return (
    <Section className={section()} noPaddingRight={screenWidth > MediaQueries.M_768}>
      <div className={cn()}>
        <ResponseApi
          status={[articlesFindAllLoading, userInterfaceLoading]}
          errors={[articlesFindAllError, userInterfaceError]}
        >
          {() => <>
            <Text as={'h2'} size={'7'} textTransform={'uppercase'} className={cn('Title')}
                  children={userInterface.articles} />
            <Swiper
              className={cn('Slider')}
              navigation
              {...sliderMediaParam}
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
