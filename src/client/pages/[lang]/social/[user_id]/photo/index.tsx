import { GetServerSideProps, NextPage } from 'next'
import { App } from '@client_projects/social/containers/App'
import { Page } from '@client_shared/components/page'
import { useRouter } from 'next/router'
import { getSSR, ssrResult } from '@client/shared/utils/getSsrFuncs'
import { RoleEnum } from '@client/projects/portfolio/router'


const SocialPhoto: NextPage = () => {
  const { pathname } = useRouter()

  return (
    <Page page={'SOCIAL_PROFILE'} subTitle={'Social'} roles={[RoleEnum.participant]}>
      <App pathname={pathname}>
        <div>photo</div>
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

export default SocialPhoto

