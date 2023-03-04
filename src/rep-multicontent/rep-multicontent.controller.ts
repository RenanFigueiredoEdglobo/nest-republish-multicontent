import { Body, Controller, Get, Post } from '@nestjs/common';
import { response } from 'express';
import { GetToken } from './GetToken/getToken.service';
import { RepMulticontentModel } from './model/rep-multicontent.model';
import { RepMulticontentService } from './rep-multicontent.service';

@Controller('republish')
export class RepMulticontentController {
    constructor(
        private readonly GetTokenService: GetToken,
        private readonly RepMultiContentService: RepMulticontentService
    ) { }
    @Get()
    async republicarMaterias() {

    }
    @Post('all')
    async atulizarTodasMateris(@Body() env: RepMulticontentModel) {
       const atualizarTodasPaginasMulticontent = await this.RepMultiContentService.atualizarTodasPaginasMulticontent(env)
       return atualizarTodasPaginasMulticontent
    }
}