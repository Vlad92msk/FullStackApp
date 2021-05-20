import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '../users/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'
import { ConfigModule } from '@nestjs/config'
import { TokenModule } from '../tokens/token.module'
import { AuthResolver } from './auth.resolver'
import { AuthController } from './auth.controller'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { config } from 'dotenv'

config()

@Module({
  imports: [
    UserModule,
    TokenModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
