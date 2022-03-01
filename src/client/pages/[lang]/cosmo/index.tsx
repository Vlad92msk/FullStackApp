import { NextPage } from 'next'
import { App } from '@client_projects/cosmo/containers/App'
import { Page } from '@client_shared/components/page'


const Index: NextPage = () => (
  <Page page={'COSMO'} subTitle={'Cosmo'}>
    <App />
  </Page>
)

export default Index

