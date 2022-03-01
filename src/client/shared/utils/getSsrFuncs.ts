import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { addApolloState, initializeApollo } from '@client/apolloSettings/apolloClient'
import { DEFAULT_LANGUAGE, isValidLanguage } from '@client_pages/_app'

/**
 * Возвращает объект для редиректа
 */
export const createRedirectObj = (resolvedUrl: string) => ({
  redirect: { destination: `/${DEFAULT_LANGUAGE}/${resolvedUrl.split('/').slice(2).join('/')}` },
  props: {}
})

/**
 * Валидирует запрос на корректность выбранного в URL языка
 */
export const ssrLanguageValidate = (ctx: GetServerSidePropsContext) => {
  const isValidLang = isValidLanguage(ctx.query.lang)
  if (!isValidLang) {
    return createRedirectObj(ctx.resolvedUrl)
  }
  return null
}

/**
 * "Композиция" для функции getServerSideProps
 * @param params validates - массив функций для валдации запроса
 * @param params resolve - функция Резолвер
 * @param params lang - язык перевода (берется всегда из query.lang)
 */
export const ssrCompose = (
  params: {
    validates: any[],
    resolve: <P> (apolloClient: ApolloClient<NormalizedCacheObject>) => Promise<GetServerSidePropsResult<P>>, lang: string
  }) => {
  const { validates, resolve, lang } = params

  let a
  validates.forEach((f) => f && (a = f))

  if (!a) {
    const apolloClient = initializeApollo(lang)
    return resolve(apolloClient)
  }
  return a
}

/**
 * Возвращает результат для функции getServerSideProps
 * @param apolloClient
 * @param props
 */
export const ssrResult = async <P>(apolloClient, props): Promise<GetServerSidePropsResult<P>> => {
  await addApolloState(apolloClient, { props })

  return ({ props })
}

/**
 * Для SSR
 * Вобщем я тут понакрутил
 * Но возможно переделаю
 * @param ctx
 * @param resolve
 * @param validates
 */
export const getSSR = async (ctx: GetServerSidePropsContext, resolve: <P> (apolloClient: ApolloClient<NormalizedCacheObject>) => Promise<GetServerSidePropsResult<P>>, validates?: any[]) => ssrCompose(
  {
    lang: String(ctx.query.lang),
    validates: validates ? [ssrLanguageValidate(ctx), ...validates] : [ssrLanguageValidate(ctx)],
    resolve
  })
