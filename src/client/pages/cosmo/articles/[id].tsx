import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Page } from '@shared/components/page'
import { Button } from '@shared/components/Button'
import { addApolloState, initializeApollo } from '~client/apolloSettings/apolloClient'
import {
  ArticlesFindOneDocument,
  ArticlesFindOneQuery,
  ArticlesFindOneQueryVariables
} from '~client/projects/gql-generated-hooks'


interface ArticleProps extends ArticlesFindOneQuery {
}

const Article: NextPage<ArticleProps> = ({ articlesFindOne }) => {
  const { back } = useRouter()

  /**
   * TODO: Стилизовать статью
   */
  return (
    <Page subTitle={'Cosmo'}>
      <Button styleType={'rounded'} color={'blue'} icon={'arrow-left-sharp'} onClick={back}>Вернуться</Button>
      <div>Страница №{articlesFindOne.id}</div>
      <div>Заголовок:{articlesFindOne.title}</div>
      <div>Текст:{articlesFindOne.article}</div>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const apolloClient = initializeApollo()

  /**
   * Запрашиваем статью
   */
  const { data: { articlesFindOne } } = await apolloClient.query<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>({
    query: ArticlesFindOneDocument, variables: {
      searchParam: { id: Number(query.id) }
    }
  })

  return addApolloState(apolloClient, {
    props: {
      articlesFindOne
    }
  })
}

export default Article
