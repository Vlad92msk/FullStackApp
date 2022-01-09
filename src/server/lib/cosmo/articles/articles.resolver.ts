import { Resolver, Query, Args } from '@nestjs/graphql'
import { from } from 'rxjs'
import { ArticlesService } from './articles.service'
import { LanguageSupported, MyObservable } from '~server/types'
import { Article } from '~server/lib/cosmo/articles/entitys/articles.entity'
import { FindArticleInput } from '~server/lib/cosmo/articles/inputs/find-article.input'
import { ProjectLanguage } from '~server/lib/connect/users/decorators/user.decorator'

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private articlesService: ArticlesService) {
  }

  @Query(() => [Article], { description: 'Найти статьи' })
  articlesFindAll(
    @ProjectLanguage() language: LanguageSupported,
    @Args({ name: 'searchParam', nullable: true, type: () => FindArticleInput }) searchParam: FindArticleInput
  ): MyObservable<Article[]> {
    return from(this.articlesService.findAllArticles([language, searchParam]))
  }

  @Query(() => Article, { description: 'Найти 1 статью по условию' })
  articlesFindOne(
    @Args({ name: 'searchParam', type: () => FindArticleInput }) searchParam: FindArticleInput
  ): MyObservable<Article> {
    return from(this.articlesService.findOneArticles(searchParam))
  }
}
