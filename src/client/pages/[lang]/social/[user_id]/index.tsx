import { GetServerSideProps, NextPage } from 'next'
import { ROUTES_ALL } from '@client/projects/routesAll'
import { Loader } from '@client/shared/components/Loader'

const Index: NextPage = () => <Loader />

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /**
   * ctx.resolvedUrl - текущий путь
   */
  return ({
    redirect: {
      destination: `${ctx.resolvedUrl}/${ROUTES_ALL.SOCIAL_PROFILE}`,
      permanent: true
    },
    props: {}
  })
}
export default Index

