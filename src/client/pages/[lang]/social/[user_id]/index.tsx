import { GetServerSideProps, NextPage } from 'next'
import { App } from '@client_projects/social/containers_v2/App'
import { Page } from '@client_shared/components/page'
import { getSSR, ssrResult } from '@client/shared/utils/getSsrFuncs'
import { Profile } from '@client/projects/social/containers_v2/Profile'


const UserPage: NextPage = () => (
  <Page page={'SOCIAL'} subTitle={'Social'}>
    <App>
      <Profile />
    </App>
  </Page>
)

export const getServerSideProps: GetServerSideProps = (ctx) => getSSR(ctx, async (apolloClient) => {
  // const article = await apolloClient.query<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>({
  //   query: ArticlesFindOneDocument,
  //   variables: {
  //     searchParam: { id: Number(ctx.query.id) }
  //   }
  // })

  return ssrResult(apolloClient, { })
})

export default UserPage

