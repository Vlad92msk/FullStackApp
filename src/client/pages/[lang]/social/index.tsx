import { NextPage } from 'next'
import { App } from '@client_projects/social/containers/App'
import { Page } from '@client_shared/components/page'


const Index: NextPage = () => (
  <Page page={'SOCIAL'} subTitle={'Social'}>
    <App />
  </Page>
)

export default Index

