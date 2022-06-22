import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { config } from 'aws-sdk'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  )
  const configService = app.get(ConfigService)

  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY'),
    secretAccessKey: configService.get('AWS_SECRET_KEY'),
    region: configService.get('AWS_REGION'),
  })
  await app.listen(8000)
}
bootstrap()
