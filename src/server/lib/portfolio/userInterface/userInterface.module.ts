import { Module } from '@nestjs/common'

import { DatabaseModule } from '@server_db/db.module'
import { UserInterfaceProviders } from './providers/userInterface.providers'
import { UserInterfaceService } from './userInterface.service'
import { UserInterfaceResolver } from './userInterface.resolver'

@Module({
  imports: [DatabaseModule],
  providers: [...UserInterfaceProviders, UserInterfaceService, UserInterfaceResolver],
  exports: [UserInterfaceService],
})
export class UserInterfaceModule {}
