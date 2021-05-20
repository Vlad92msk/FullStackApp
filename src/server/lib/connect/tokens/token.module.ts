import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../../db/db.module'
import { TokenProviders } from './providers/token.providers'
import { TokenService } from './token.service'

@Module({
  imports: [DatabaseModule],
  providers: [...TokenProviders, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
