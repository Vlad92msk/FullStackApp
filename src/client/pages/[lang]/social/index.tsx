import { GetServerSideProps, NextPage } from 'next'
import { ROUTES_ALL } from '@client/projects/routesAll'

const Index: NextPage = () => <></>

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  /**
   * TODO: заменить ID пользователя на реальный из локального СТора
   */
  return ({
    redirect: {
      destination: `/${ctx.query.lang}/${ROUTES_ALL.SOCIAL}/1/${ROUTES_ALL.SOCIAL_PROFILE}`,
      permanent: true
    },
    props: {}
  })
}
export default Index

