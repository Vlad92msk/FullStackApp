import { Module } from '@nestjs/common'
import { UserModule } from './users/user.module'
import { AuthModule } from './auth/auth.module'
import { TokenModule } from './tokens/token.module'
import { RoleModule } from './roles/role.module'

@Module({
  imports: [UserModule, AuthModule, TokenModule, RoleModule],
  exports: [UserModule, AuthModule, TokenModule, RoleModule],
})
export class ConnectModule {}
