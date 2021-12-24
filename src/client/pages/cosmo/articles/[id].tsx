import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Article: NextPage = () => {
  const routers = useRouter()
  return (<div>{routers.query.id}</div>)
}

export default Article
