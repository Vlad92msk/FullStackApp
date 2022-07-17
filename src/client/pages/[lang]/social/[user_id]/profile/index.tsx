import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { App } from '@client_projects/social/containers/App'
import { Page } from '@client_shared/components/page'
import { getSSR, ssrResult } from '@client_shared/utils/getSsrFuncs'
import { Profile } from '@client/projects/social/containers/Profile'
import { RoleEnum } from '@client/projects/portfolio/router'


const ProfilePage: NextPage = () => {
  const { pathname } = useRouter()

  return (
    <Page page={'SOCIAL_PROFILE'} subTitle={'Social'} roles={[RoleEnum.participant]}>
      <App pathname={pathname}>
        <Profile />
      </App>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = (ctx) => getSSR(ctx, async (apolloClient) => {

  console.log('2', 2)// const article = await apolloClient.query<ArticlesFindOneQuery, ArticlesFindOneQueryVariables>({
  //   query: ArticlesFindOneDocument,
  //   variables: {
  //     searchParam: { id: Number(ctx.query.id) }
  //   }
  // })

  return ssrResult(apolloClient, {})
})

export default ProfilePage

