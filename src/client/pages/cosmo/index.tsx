import { NextPage } from 'next'
import { AuthGuard } from '@shared/containers/AuthGuard'
import { App } from '~client/modules/cosmo/containers/App'
import { Page } from '@shared/components/page'

const Index: NextPage = () => (
  <AuthGuard page={'cosmo'}>
    <Page title={'Vlad'} subTitle={'Cosmo'}>
      <App />
    </Page>
  </AuthGuard>
)

export default Index

