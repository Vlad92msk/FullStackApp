import { Resolver, Query } from '@nestjs/graphql'
import { from } from 'rxjs'
import { UserInterfaceService } from './userInterface.service'
import { LanguageSupported, MyObservable } from '~server/types'
import { ProjectLanguage } from '~server/lib/connect/users/decorators/user.decorator'
import { Interface_ru } from './entitys/userInterface_ru.entity'

@Resolver(() => Interface_ru)
export class UserInterfaceResolver {
  constructor(private userInterfaceService: UserInterfaceService) {
  }

  @Query(() => Interface_ru, { description: 'Получить интерфейс портфолио' })
  userInterfacePortfolioFindAll(
    @ProjectLanguage() language: LanguageSupported
  ): MyObservable<Interface_ru> {
    return from(this.userInterfaceService.findUserInterface([language]))
  }
}
