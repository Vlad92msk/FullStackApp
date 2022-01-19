import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from '~server/lib/app.module'
import { config } from 'dotenv'
config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser());
  app.enableCors();
  await app.listen(process.env.LOCAL_HOST_NUMBER || 3000)
  console.log(`Project is running running at: http://${process.env.LOCAL_HOST}${process.env.LOCAL_HOST_NUMBER || 3000}/`)
}

bootstrap()
