import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require("dotenv").config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  Logger.log(`server on in http://localhost:${process.env.PORT}`);
}
bootstrap();
