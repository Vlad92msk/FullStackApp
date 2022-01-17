import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { catchError, from, map, of, switchMap } from 'rxjs'

import { createLanguageVariables, CreateLanguageVariablesType } from '~server/utils/createLanguageVariables'
import { Article_en } from '~server/lib/cosmo/articles/entitys/articles_en.entity'
import { PostgreConstants } from '~server/db/db.constants'
import { catchErrorCustom } from '~server/utils/catchErrorCustom'
import { LanguageSupported, MyObservable } from '~server/types'
import { ArticleErrors } from '~server/lib/cosmo/articles/errors'

import { FindArticleInput } from './inputs/find-article.input'
import { Article_ru } from './entitys/articles.entity'

const { COSMO: { schemas: { ARTICLES } } } = PostgreConstants

@Injectable()
export class ArticlesService {
  private readonly langVar: CreateLanguageVariablesType

  constructor(
    @Inject(ARTICLES.ru.rep__base_articles)
    readonly articleRepository: Repository<Article_ru>,
    @Inject(ARTICLES.en.rep__base_articles)
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
  public findAllArticles = ([language, where]: [LanguageSupported, FindArticleInput]): MyObservable<Article_ru[]> => from(
    this.langVar[language].find(where ? { where, order: { id: 'ASC' } } : { order: { id: 'ASC' } })
  ).pipe(
    switchMap((data) => of(data)),
    catchError((err) => catchErrorCustom(`${this.findAllArticles.name} - ${ArticleErrors.FIND_ALL_ARTICLES}`))
  )


  /**
   * Найти 1 статью
   */
  public findOneArticles = ([language, where]: [LanguageSupported, FindArticleInput]): MyObservable<Article_ru> => from(
    this.langVar[language].findOne({ where })
  ).pipe(
    /**
     * FIXME: убрать потом пустой объект и придумать как читать ошибку на клиенте если не находит нужного значения в БД
     */
    map((data: Article_ru) => data || ({ id: 0, article: '', title: '' })),
    catchError((err) => catchErrorCustom(err))
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
