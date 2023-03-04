import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {  GetToken } from './GetToken/getToken.service';
import { RepMulticontentController } from './rep-multicontent.controller';
import { RepMulticontentService } from './rep-multicontent.service';
@Module({
  controllers: [RepMulticontentController],
  providers: [RepMulticontentService,GetToken],
})
export class RepMulticontentModule {}
