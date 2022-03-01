import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { Page } from '@client_shared/components/page'
import { ssrResult, getSSR } from '@client_shared/utils/getSsrFuncs'
import { ResponseApi } from '@client_shared/components/ResponseApi'
import { Section } from '@client_shared/components/Section'
import { Button } from '@client_shared/components/Button'
import {
  ArticlesFindOneDocument,
  ArticlesFindOneQuery,
  ArticlesFindOneQueryVariables,
  ArticlesFindOneQueryResult
} from '@client_projects/gql-generated-hooks'

type ArticlesQuery = {
  article: ArticlesFindOneQueryResult
}

interface ArticleProps extends ArticlesQuery {
}

const Article: NextPage<ArticleProps> = ({ article }) => {
  const { data: { articlesFindOne } = {}, loading, error } = article
  const { back } = useRouter()

  /**
   * TODO: Стилизовать статью
   */
  return (
    <Page subTitle={'Cosmo'}>
      <Section>
        <Button styleType={'rounded'} color={'blue'} icon={'arrow-left-sharp'} onClick={back}>Вернуться</Button>
        <ResponseApi status={[loading]} errors={[error]}>
          {() => <>
            {
              articlesFindOne.id ? <>
                <div>Страница №{articlesFindOne.id}</div>
                <div>Заголовок:{articlesFindOne.title}</div>
                <div>Текст:{articlesFindOne.article}</div>
              </> : <div>Ничего не найдено</div>
            }
          </>}
        </ResponseApi>
      </Section>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = (ctx) => getSSR(ctx, async (apolloClient) => {
  const article = await apolloClient.query<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>({
    query: ArticlesFindOneDocument,
    variables: {
      searchParam: { id: Number(ctx.query.id) }
    }
  })

  return ssrResult(apolloClient, { article })
})

export default Article
