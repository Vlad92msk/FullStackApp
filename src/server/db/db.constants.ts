export const PostgreConstants = {
  CONNECT_DB: {
    repository: 'CONNECT_REPOSITORY',
    connect: 'CONNECT_DB',
    users: { name: 'User' },
    tokens: { name: 'Token' },
    roles: { name: 'Role' }
  },
  PORTFOLIO: {
    connect: 'PORTFOLIO_DB',

    repository: 'PORTFOLIO_REPOSITORY',
    skills: { name: 'Skill' },

    tables: {
      INTERFACE: {
        ru: {
          rep__interface_portfolio: 'REPOSITORY__INTERFACE_PORTFOLIO__RU',
          name__interface_portfolio: 'Interface_ru'
        },
        en: {
          rep__interface_portfolio: 'REPOSITORY__INTERFACE_PORTFOLIO__EN',
          name__interface_portfolio: 'Interface_en'
        }
      }
    }
  },
  COSMO: {
    connect: 'COSMO_DB',
    /**
     * Схемы баз данных
     */
    schemas: {
      /**
       * Схема - Интерфейс
       */
      INTERFACE: {
        /**
         * Набор таблиц в конкретной схеме
         */

        ru: {
          rep__interface_cosmo: 'REPOSITORY__INTERFACE_COSMO__RU',
          name__interface_cosmo: 'Interface_cosmo_ru'

          // repository__BaseArticles1: 'REPOSITORY__[dbName...]__RU',
          // name__BaseArticles1: '[db name...]',
        },
        en: {
          rep__interface_cosmo: 'REPOSITORY__INTERFACE_COSMO__EN',
          name__interface_cosmo: 'Interface_cosmo_en'

          // repository__BaseArticles1: 'REPOSITORY__[dbName...]__EN',
          // name__BaseArticles1: '[db name...]',
        }
      },

      /**
       * Схема - Статьи
       */
      ARTICLES: {
        ru: {
          rep__base_articles: 'REPOSITORY__BASE_ARTICLES__RU',
          name__base_articles: 'Article_ru',
        },
        en: {
          rep__base_articles: 'REPOSITORY__BASE_ARTICLES__EN',
          name__base_articles: 'Article_en'
        }
      }
    },
  }
}
