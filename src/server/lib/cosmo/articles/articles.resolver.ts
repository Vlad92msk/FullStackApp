import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { from } from 'rxjs'
import { ArticlesService } from './articles.service'
import { MyObservable } from '~server/types'
import { Article } from '~server/lib/cosmo/articles/entitys/articles.entity'
import { FindArticleInput } from '~server/lib/cosmo/articles/inputs/find-article.input'

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private articlesService: ArticlesService) {
  }

  @Query(() => [Article], { description: 'Найти статьи' })
  articlesFindAll(
    @Args({ name: 'searchParam', nullable: true, type: () => FindArticleInput }) searchParam: FindArticleInput
  ): MyObservable<Article[]> {
    return from(this.articlesService.findAllArticles(searchParam))
  }

  @Query(() => Article, { description: 'Найти 1 статью по условию' })
  articlesFindOne(
    @Args({ name: 'searchParam', type: () => FindArticleInput }) searchParam: FindArticleInput
  ): MyObservable<Article> {
    return from(this.articlesService.findOneArticles(searchParam))
  }
}
