import { Controller, Get, Res, Req } from '@nestjs/common'
import { Request, Response } from 'express'

import { NextStartService } from './nextStart.service'

@Controller('/')
export class NextStartController {
  constructor(private viewService: NextStartService) {}

  @Get('*')
  static(@Req() req: Request, @Res() res: Response) {
    const handle = this.viewService.getNextServer().getRequestHandler()
    handle(req, res)
  }
}
