import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '../users/user.module'
import { ConfigModule } from '@nestjs/config'
import { TokenModule } from '../tokens/token.module'
import { AuthResolver } from './auth.resolver'
import { AuthController } from './auth.controller'
import { AuthGuard } from './guards/auth-guard'

@Module({
  imports: [
    UserModule,
    TokenModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [AuthService, AuthResolver, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
