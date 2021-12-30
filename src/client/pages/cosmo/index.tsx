import { NextPage } from 'next'
import { App } from '~client/projects/cosmo/containers/App'
import { Page } from '@shared/components/page'


const Index: NextPage = () => (
  <Page subTitle={'Cosmo'}>
    <App />
  </Page>
)

export default Index

