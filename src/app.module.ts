import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepMulticontentModule } from './rep-multicontent/rep-multicontent.module';
require("dotenv").config()
@Module({
  imports: [
    RepMulticontentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
