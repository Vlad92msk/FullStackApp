import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { App } from '@client_projects/social/containers_v2/App'
import { Page } from '@client_shared/components/page'
import { getSSR, ssrResult } from '@client_shared/utils/getSsrFuncs'
import { Profile } from '@client/projects/social/containers_v2/Profile'


const ProfilePage: NextPage = () => {
  const { pathname } = useRouter()

  return (
    <Page page={'SOCIAL_PROFILE'} subTitle={'Social'}>
      <App pathname={pathname}>
        <Profile />
      </App>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = (ctx) => getSSR(ctx, async (apolloClient) => {
  // const article = await apolloClient.query<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>({
  //   query: ArticlesFindOneDocument,
  //   variables: {
  //     searchParam: { id: Number(ctx.query.id) }
  //   }
  // })

  return ssrResult(apolloClient, {})
})

export default ProfilePage

