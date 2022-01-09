import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { catchError, from, map, of, switchMap } from 'rxjs'
import { Article } from './entitys/articles.entity'
import { PostgreConstants } from '~server/db/db.constants'
import { FindArticleInput } from './inputs/find-article.input'
import { catchErrorCustom } from '~server/utils/catchErrorCustom'
import { LanguageSupported, MyObservable } from '~server/types'
import { ArticleErrors } from '~server/lib/cosmo/articles/errors'
import { Article_en } from '~server/lib/cosmo/articles/entitys/articles_en.entity'
import { createLanguageVariables, CreateLanguageVariablesType } from '~server/utils/createLanguageVariables'



@Injectable()
export class ArticlesService {
  private readonly langVar:CreateLanguageVariablesType

  constructor(
    @Inject(PostgreConstants.COSMO.repository)
    readonly articleRepository: Repository<Article>,

    @Inject(PostgreConstants.COSMO.repository_EN)
    readonly articleRepository_en: Repository<Article_en>
  ) {
    /**
     * Создает объект для переключения на базу данных с соответствующим языком
     */
    this.langVar = createLanguageVariables(['ru', 'en'], [this.articleRepository, this.articleRepository_en])
  }

  /**
   * Найти все статьи
   * @param where
   * @param language
   */
  public findAllArticles = ([language, where]: [LanguageSupported, FindArticleInput]): MyObservable<Article[]> => from(
    this.langVar[language].find(where ? { where, order: { id: 'ASC' } } : { order: { id: 'ASC' } })
  ).pipe(
    switchMap((data) => of(data)),
    catchError((err) => catchErrorCustom(`${this.findAllArticles.name} - ${ArticleErrors.FIND_ALL_ARTICLES}`))
  )


  /**
   * Найти 1 статью
   * @param where
   */
  public findOneArticles = (where: FindArticleInput): MyObservable<Article> => from(
    this.langVar['ru'].findOne(where)
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
