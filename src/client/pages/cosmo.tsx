import React from 'react'
import { NextPage } from 'next'
import { AuthGuard } from '@shared/containers/AuthGuard'

const Cosmo: NextPage = () => {

  return <AuthGuard page={'cosmo'}>
    <div>Cosmo</div>
  </AuthGuard>
}

export default Cosmo

