import { Resolver, Query, Args } from '@nestjs/graphql'
import { from } from 'rxjs'

import { LanguageSupported, MyObservable } from '~server/types'
import { Article_ru } from '~server/lib/cosmo/articles/entitys/articles.entity'
import { FindArticleInput } from '~server/lib/cosmo/articles/inputs/find-article.input'
import { ProjectLanguage } from '~server/lib/connect/users/decorators/user.decorator'
import { ArticlesService } from './articles.service'

@Resolver(() => Article_ru)
export class ArticlesResolver {
  constructor(private articlesService: ArticlesService) {
  }

  @Query(() => [Article_ru], { description: 'Найти статьи' })
  articlesFindAll(
    @ProjectLanguage() language: LanguageSupported,
    @Args({ name: 'searchParam', nullable: true, type: () => FindArticleInput }) searchParam: FindArticleInput
  ): MyObservable<Article_ru[]> {
    return from(this.articlesService.findAllArticles([language, searchParam]))
  }

  @Query(() => Article_ru, { description: 'Найти 1 статью по условию' })
  articlesFindOne(
    @Args({ name: 'searchParam', type: () => FindArticleInput }) searchParam: FindArticleInput
  ): MyObservable<Article_ru> {
    return from(this.articlesService.findOneArticles(searchParam))
  }
}
