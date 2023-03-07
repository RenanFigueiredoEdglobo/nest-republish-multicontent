import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RepMulticontentModel } from './model/rep-multicontent.model';
import { RepMulticontentService } from './rep-multicontent.service';

@Controller('republish')
export class RepMulticontentController {
    constructor(
        private readonly RepMultiContentService: RepMulticontentService
    ) { }
    @Post('all')
    async atulizarTodasMateris(@Body() body: RepMulticontentModel) {
       const atualizarTodasPaginasMulticontent = await this.RepMultiContentService.atualizarTodasPaginasMulticontent(body);
       return atualizarTodasPaginasMulticontent;
    }
    @Post(':id')
    async atualizarMateriaPorId(@Param('id')id:string,@Body()body: RepMulticontentModel,){
        const atualizarMateriaPorID = await this.RepMultiContentService.atualizarMateriaPorID(id,body);
        return atualizarMateriaPorID;
    }
}