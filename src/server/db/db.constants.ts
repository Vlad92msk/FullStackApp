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
          repository: 'REPOSITORY_INTERFACE_RU',
          data_base: 'Interface_ru'
        },
        en: {
          repository: 'REPOSITORY_INTERFACE_EN',
          data_base: 'Interface_en'
        }
      }
    }
  },
  COSMO: {
    connect: 'COSMO_DB',

    repository: 'COSMO_REPOSITORY',
    articles: { name: 'Article' },

    repository_EN: 'COSMO_REPOSITORY_EN',
    articles_en: { name: 'Article_en' }
  }
}
