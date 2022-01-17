import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { DEFAULT_LANGUAGE } from '~client/pages/_app'

/**
 * Корень проекта - Портфолио
 * @constructor
 */
const Home: NextPage = () => <></>
export const getServerSideProps: GetServerSideProps = async () => {

  return ({
    redirect: {
      destination: `/${DEFAULT_LANGUAGE}/portfolio`,
      permanent: true
    },
    props: {}
  })
}

export default Home
