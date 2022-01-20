# FULLSTACK APP LEARNING
___

# О проекте

Это мой учебный проект на котором я нарабатываю практику по интересным для меня
технологиям:

+ **Frontend:**
  1. NextJs <img src="https://logowiki.net/uploads/logo/n/nextjs-3.svg"  height="30" />
  2. Apollo Graphql <img src="https://logowiki.net/uploads/logo/a/apollo-graphql-compact.svg" height="30" />
     <br/>
     <br/>
     <br/>
+ **Backend:**
  1. NestJs <img src="https://miro.medium.com/max/1200/0*kS3GZAc7IGO3gvxx.png"  height="30"/>
  2. PostgresSQL <img src="https://logowiki.net/uploads/logo/p/postgresql.svg"  height="30"/>
  3. TypeORM<img src="https://camo.githubusercontent.com/68c6ef63a304bc3677ea8d71fe6d8818b6cea84f9eb3c5a9b41aa99dee8942b8/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6669742f742f323231372f313032362f312a7254627948337a4c3755653856795448524d524441412e706e67" height="30" >
     <br/>
     <br/>
     <br/>
+ **Общие:**
   1. RxJs <img src="https://logowiki.net/uploads/logo/r/rxjs-1.svg" height="30"/>
   2. Github <img src="https://logowiki.net/uploads/logo/g/github-1.svg"  height="30"/>
   3. Docker <img src="https://logowiki.net/uploads/logo/d/docker.svg"  height="30"/>
   4. nGinx <img src="https://logowiki.net/uploads/logo/n/nginx-1.svg"  height="30"/>
   5. webpack <img src="https://logowiki.net/uploads/logo/w/webpack-icon.svg"  height="30"/>
   6. Тесты <img src="https://logowiki.net/uploads/logo/j/jest-0.svg"  height="30"/>
  
Что-то из этого уже освоил, чтото еще предстоит, а о чем то я возможно не знаю и добавлю позже.
___
# Почему именно эти технологии
1. **Graphql** - это минимум кода в отличии от Redux. <br /> Все, что нужно - написать схему того, что я хочу получить от бэка, запустить кодгенератор для создания хука и использовать его. И все!.<br />
   <br /> GQL-схема:
```graphql
   query ArticlesFindAll($searchParam: FindArticleInput) {
     articlesFindAll(searchParam: $searchParam) {
       article
       id
       title
      }
     }
```
<br /> Реализация сгенерированного хука:

   ```typescript
    const {
    data: { articlesFindAll = [] } = {},
    loading: articlesFindAllLoading,
    error: articlesFindAllError
    } = useArticlesFindAllQuery()
```
2. **NextJs** - Это и SSR и удобный роутинг (возможно есть еще преимущества, но я пока в процессе изучения)
3. **NestJs** - Современный фреймворк, в котором есть все, что необходимо для написания бэка 
___
## Структура проекта


```
.
├── node_modules
├── .github (github-actions)
├── dist (куда собирается проект)
├── schema.gql (схема, автоматически генерируется бэком)
├── codegen.yml (описание того, как и куда генерировать хуки из моих gql-схем)
├── .graphqlconfig (как локально тестировать запросы через IDE)
└── src
     ├--client
     |    |--- .next
     |    |--- apolloSettings
     |    |--- pages
     |    |      |--- [lang]
     |    |      |      ├--cosmo
     |    |      |      ├--portfolio
     |    |      |      └--....
     |    |      |
     |    |      |--- 404.tsx
     |    |      |--- _app.tsx
     |    |      └--- index.tsx
     |    |
     |    |--- projects (модули проекта)
     |    |       |--- cosmo
     |    |       |      |--- containers (основные контейнеры модуля)
     |    |       |      |        |--- App
     |    |       |      |        |--- Container 1
     |    |       |      |        |--- Container 2
     |    |       |      |        |        |--- components (компоненты конкретного модуля)
     |    |       |      |        |        |       |--- Component 1
     |    |       |      |        |        |       |--- Component 2
     |    |       |      |        |        |       |        |---Component.tsx
     |    |       |      |        |        |       |        └---Component.module.scss
     |    |       |      |        |        |       |         
     |    |       |      |        |        |       └--- Component ...
     |    |       |      |        |        |        
     |    |       |      |        |        |--- Container.module.scss
     |    |       |      |        |        |--- Container.tsx
     |    |       |      |        |        └--- index.ts (все компоненыты экспортируются из 1 файла)
     |    |       |      |        |
     |    |       |      |        └--- Container ...
     |    |       |      |        
     |    |       |      |--- graphql (схемы запросов конкретного модуля)
     |    |       |      |       |--- articles.gql
     |    |       |      |       |--- interface.gql
     |    |       |      |       └--- ....gql
     |    |       |      |       
     |    |       |      |--- moduleGeneralCN.ts
     |    |       |      |--- router.ts (навигация по модулю)
     |    |       |      └--- ...
     |    |       |
     |    |       |--- portfolio
     |    |       |        └--- ...
     |    |       |        
     |    |       |--- gql-generated-hooks.ts (файл, в который генерируются все хуки проекта)
     |    |       └--- routesAll.ts
     |    |
     |    |--- public
     |    |      |--- models
     |    |      |       |--- cookie.ts
     |    |      |       |--- defaultObject.model.ts
     |    |      |       |--- icon.model.ts
     |    |      |       |--- localStorage.ts
     |    |      |       └--- ...
     |    |      |
     |    |      |--- resources
     |    |      |       |--- fonts
     |    |      |       |--- icons
     |    |      |       |--- images
     |    |      |       |      |--- cosmo (строго 2 формата каждой картинки)
     |    |      |       |      |     |--- img1.avif
     |    |      |       |      |     |--- img1.webp
     |    |      |       |      |     |
     |    |      |       |      |     |--- img2.avif
     |    |      |       |      |     |--- img2.webp
     |    |      |       |      |     |
     |    |      |       |      |     |--- img....avif
     |    |      |       |      |     └--- img....webp
     |    |      |       |      |     
     |    |      |       |      |--- portfolio
     |    |      |       |      └--- ...
     |    |      |       |
     |    |      |       └--- videos
     |    |      |
     |    |      └--- styles
     |    |             |--- lib
     |    |             |     |--- functions.scss
     |    |             |     |--- mediaQueries.scss
     |    |             |     └--- mixins.scss
     |    |             |      
     |    |             |--- variables
     |    |             |       |--- _index.scss
     |    |             |       |--- colors.scss
     |    |             |       |--- shadows.scss
     |    |             |       └--- typography.scss
     |    |             |       
     |    |             |--- base.scss
     |    |             |--- fonts.scss
     |    |             └--- materialUI.ts
     |    |
     |    └--- shared
     |           |--- components
     |           |        |--- Component1
     |           |        |        |--- Component.tsx
     |           |        |        |--- Component.module.scss
     |           |        |        └--- index.ts
     |           |        |        
     |           |        |--- Component2
     |           |        |        |--- Component.tsx
     |           |        |        |--- Component.module.scss
     |           |        |        └--- index.ts
     |           |        |        
     |           |        └--- Component...
     |           |        
     |           |--- containers
     |           |        |--- Container1
     |           |        |        |--- Container1.tsx
     |           |        |        |--- Container1.module.scss
     |           |        |        └--- index.ts
     |           |        └--- Container...
     |           |        
     |           |--- hooks
     |           |--- utils
     |           |--- next-env.d.ts
     |           └--- tsconfig.json
     |    
     └--- server
            |--- config    
            |--- db 
            |     |--- db.constants.ts  
            |     |--- db.module.ts  
            |     └--- db.providers.ts  
            |     
            |--- lib   
            |     |--- connect
            |     |       |--- users
            |     |       |      |--- decorators
            |     |       |      |--- entitys
            |     |       |      |--- errors
            |     |       |      |--- inputs
            |     |       |      |--- interfaces
            |     |       |      |--- providers
            |     |       |      |
            |     |       |      |--- user.module.ts
            |     |       |      |--- user.resolver.ts
            |     |       |      └--- user.service.ts
            |     |       |      
            |     |       |--- mail
            |     |       |--- roles
            |     |       |--- auth
            |     |       |--- tokens
            |     |       |--- ...
            |     |       └--- connection.module.ts
            |     |        
            |     |--- cosmo
            |     |--- portfolio
            |     |--- nextStart
            |     └--- app.module.ts
            |     
            |--- utils    
            |--- main.ts    
            └--- types.ts    
```
Для проекта так же созана группа в `Telegram`, куда `Telegram-bot` через `Github-actions` отправляет уведомления о действиях в ветку мастер


*PS: еще буду дописывать README*
