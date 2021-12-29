import { NextPage } from 'next'
import { AuthGuard } from '@shared/containers/AuthGuard'
import { App } from '~client/projects/cosmo/containers/App'
import { Page } from '@shared/components/page'


const Index: NextPage = () => (
  <AuthGuard>
    <Page subTitle={'Cosmo'}>
      <App />
    </Page>
  </AuthGuard>
)

export default Index

