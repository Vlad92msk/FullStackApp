import { NestFactory } from '@nestjs/core'
import { AppModule } from '~server/lib/app.module'
// import { AppModule } from '../../dist/server/lib/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.LOCAL_HOST_NUMBER)
  console.log(`Project is running running at: http://${process.env.LOCAL_HOST}${process.env.LOCAL_HOST_NUMBER}/`)
}

bootstrap()