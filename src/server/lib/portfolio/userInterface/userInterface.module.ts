import { Module } from '@nestjs/common'
import { UserInterfaceProviders } from './providers/userInterface.providers'
import { UserInterfaceService } from './userInterface.service'
import { UserInterfaceResolver } from './userInterface.resolver'
import { DatabaseModule } from '~server/db/db.module'

@Module({
  imports: [DatabaseModule],
  providers: [...UserInterfaceProviders, UserInterfaceService, UserInterfaceResolver],
  exports: [UserInterfaceService],
})
export class UserInterfaceModule {}
