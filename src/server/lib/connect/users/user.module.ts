import { Module } from '@nestjs/common'

import { RoleModule } from '@server_lib/connect/roles/role.module'
import { DatabaseModule } from '@server_db/db.module'
import { UsersProviders } from './providers/user.providers'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { AuthGuard } from '../auth/guards/auth-guard'

@Module({
  imports: [DatabaseModule, RoleModule],
  providers: [...UsersProviders, UserService, UserResolver, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
