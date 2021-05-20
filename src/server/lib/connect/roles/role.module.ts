import { Module } from '@nestjs/common'
import { DatabaseModule } from '~server/db/db.module'
import { RolesProviders } from './providers/role.providers'
import { RoleService } from './role.service'
import { RoleResolver } from './role.resolver'
import { UserService } from '~server/lib/connect/users/user.service'

@Module({
  imports: [DatabaseModule],
  providers: [...RolesProviders, RoleService, RoleResolver, UserService],
  exports: [RoleService],
})
export class RoleModule {}
