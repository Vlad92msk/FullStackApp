import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { catchError, from, map, of, switchMap } from 'rxjs'
import { Article } from './entitys/articles.entity'
import { PostgreConstants } from '~server/db/db.constants'
import { FindArticleInput } from './inputs/find-article.input'
import { catchErrorCustom } from '~server/utils/catchErrorCustom'
import { MyObservable } from '~server/types'
import { ArticleErrors } from '~server/lib/cosmo/articles/errors'

//
@Injectable()
export class ArticlesService {
  constructor(
    @Inject(PostgreConstants.COSMO.repository)
    readonly articleRepository: Repository<Article>
  ) {
  }

  /**
   * Найти все статьи
   * @param where
   */
  public findAllArticles = (where?: FindArticleInput): MyObservable<Article[]> => from(
    this.articleRepository.find(where ? { where, order: { id: 'ASC' } } : { order: { id: 'ASC' } })
  ).pipe(
    switchMap((data) => of(data)),
    catchError((err) => catchErrorCustom(`${this.findAllArticles.name} - ${ArticleErrors.FIND_ALL_ARTICLES}`))
  )

  /**
   * Найти 1 статью
   * @param where
   */
  public findOneArticles = (where: FindArticleInput): MyObservable<Article> => from(
    this.articleRepository.findOne(where)
  ).pipe(
    switchMap((data) => of(data)),
    catchError((err) => catchErrorCustom(`${this.findOneArticles.name} - ${ArticleErrors.FIND_ONE_ARTICLES}`))
  )


  /**
   * Создать умение
   */
  // public createSkill = (input: CreateSkillInput): MyObservable<Skill> =>
  //   this.findSkillByValue(input)
  //   .pipe(
  //     switchMap((found) => {
  //       if (found) throw new GraphQLError('createSkill - Умение уже существует')
  //
  //       return of(input).pipe(
  //         map((newSkill) => this.skillRepository.create(newSkill)),
  //         switchMap((createdSkill) => this.skillRepository.save(createdSkill)),
  //         catchError((err) => catchErrorCustom('createSkill - Ошибка создания умения')))
  //     }),
  //   )

}
