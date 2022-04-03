import { GetServerSideProps, NextPage } from 'next'
import { App } from '@client_projects/social/containers_v2/App'
import { Page } from '@client_shared/components/page'
import { getSSR, ssrResult } from '@client/shared/utils/getSsrFuncs'


const SocialPhoto: NextPage = () => (
  <Page page={'SOCIAL'} subTitle={'Social'}>
    <div>video</div>
  </Page>
)

export const getServerSideProps: GetServerSideProps = (ctx) => getSSR(ctx, async (apolloClient) => {
  // const article = await apolloClient.query<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>({
  //   query: ArticlesFindOneDocument,
  //   variables: {
  //     searchParam: { id: Number(ctx.query.id) }
  //   }
  // })

  return ssrResult(apolloClient, {})
})

export default SocialPhoto

