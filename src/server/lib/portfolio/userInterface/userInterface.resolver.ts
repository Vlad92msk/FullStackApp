import { Resolver, Query } from '@nestjs/graphql'
import { from } from 'rxjs'

import { ProjectLanguage } from '@server_lib/connect/users/decorators/user.decorator'
import { LanguageSupported, MyObservable } from '@server/types'
import { UserInterfaceService } from './userInterface.service'
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
