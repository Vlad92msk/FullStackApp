import { GetServerSideProps, NextPage } from 'next'
import { ROUTES_ALL } from '@client/projects/routesAll'

const Index: NextPage = () => <></>

export const getServerSideProps: GetServerSideProps = async (ctx) => {
console.log('1111111111111111111111', ctx.resolvedUrl)
  /**
   * ctx.resolvedUrl - текущий путь
   */
  return ({
    // redirect: {
    //   destination: `${ctx.resolvedUrl}/${ROUTES_ALL.SOCIAL_PROFILE}`,
    //   permanent: true
    // },
    props: {}
  })
}
export default Index

