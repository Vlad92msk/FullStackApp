import { Resolver, Query } from '@nestjs/graphql'
import { from } from 'rxjs'

import { UserInterfaceService } from './userInterface.service'
import { LanguageSupported, MyObservable } from '@server/types'
import { ProjectLanguage } from '@server_lib/connect/users/decorators/user.decorator'
import { Interface_cosmo_ru } from './entitys/userInterface_ru.entity'

@Resolver(() => Interface_cosmo_ru)
export class UserInterfaceResolver {
  constructor(private userInterfaceService: UserInterfaceService) {
  }

  @Query(() => Interface_cosmo_ru, { description: 'Получить интерфейс космо' })
  userInterfaceCosmoFindAll(
    @ProjectLanguage() language: LanguageSupported
  ): MyObservable<Interface_cosmo_ru> {
    return from(this.userInterfaceService.findUserInterface([language]))
  }
}
