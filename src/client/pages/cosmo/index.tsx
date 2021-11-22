import { NextPage } from 'next'
import { AuthGuard } from '@shared/containers/AuthGuard'
import { App } from '~client/modules/cosmo/containers/App'
import { Page } from '@shared/components/page'

import { makeCn } from '@shared/utils'
import styles from '../../modules/cosmo/containers/App/App.module.scss'
const cn = makeCn('Application', styles)


const Index: NextPage = () => (
  <AuthGuard>
    <Page subTitle={'Cosmo'} className={cn()}>
      <App />
    </Page>
  </AuthGuard>
)

export default Index

