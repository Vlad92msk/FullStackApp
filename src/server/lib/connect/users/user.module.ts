import { Module } from '@nestjs/common'
import { DatabaseModule } from '~server/db/db.module'
import { UsersProviders } from './providers/user.providers'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RoleModule } from '~server/lib/connect/roles/role.module'

@Module({
  imports: [DatabaseModule, RoleModule],
  providers: [...UsersProviders, UserService, UserResolver, JwtAuthGuard],
  exports: [UserService],
})
export class UserModule {}
