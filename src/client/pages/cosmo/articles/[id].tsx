import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Page } from '@shared/components/page'

const Article: NextPage = () => {
  const routers = useRouter()
  return (<Page subTitle={'Cosmo'}>{routers.query.id}</Page>)
}

export default Article
