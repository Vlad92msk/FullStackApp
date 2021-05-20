import { Module } from '@nestjs/common'
import { NextStartService } from './nextStart.service'
import { NextStartController } from './nextStart.controller'

@Module({
  imports: [],
  providers: [NextStartService],
  controllers: [NextStartController],
})
export class NextStartModule {}
