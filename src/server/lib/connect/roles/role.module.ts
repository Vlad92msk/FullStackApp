import { Module } from '@nestjs/common'

import { UserService } from '@server_lib/connect/users/user.service'
import { DatabaseModule } from '@server_db/db.module'
import { RolesProviders } from './providers/role.providers'
import { RoleService } from './role.service'
import { RoleResolver } from './role.resolver'

@Module({
  imports: [DatabaseModule],
  providers: [...RolesProviders, RoleService, RoleResolver, UserService],
  exports: [RoleService],
})
export class RoleModule {}
