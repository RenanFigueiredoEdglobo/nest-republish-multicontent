import {  Logger,Injectable, NotAcceptableException, NotImplementedException } from '@nestjs/common';
import { response } from 'express';
import { InjectModel } from "@nestjs/mongoose";
import { GetToken } from './GetToken/getToken.service';
import { RepMulticontentModule } from './rep-multicontent.module';
import { RepMulticontentModel } from './model/rep-multicontent.model';
@Injectable()
export class RepMulticontentService {
    constructor(
       private readonly GetToke: GetToken,

    ){}
    async atualizarTodasPaginasMulticontent (body:RepMulticontentModel) {
        const getToken = await this.GetToke.getToken(body);
        if(getToken.status == 200){
            //terminar de implementar 
            console.log(getToken)
            const TENANT_ID = 'mock'
            const SETTINGS = {
                ENV: "PROD",
                HEADERS: {
                  Authorization: getToken.access_token,
                  "Content-Type": "application/json",
                },
                URL: {
                  QA: {
                    MULTI_CONTENT: `https://apis.backstage.qa.globoi.com/api/v2/multi-content/${TENANT_ID}/`,
                  },
                  PROD: {
                    MULTI_CONTENT: `https://apis.backstage.globoi.com/api/v2/multi-content/${TENANT_ID}/`,
                  },
                },
                FILE: {
                  RESPONSE_UPDATED: `./files/multicontent_updated/updated_${new Date().toISOString()}.json`,
                  LOGS: `./files/logs/log_${new Date().toISOString()}.txt`,
                },
              };
              

        }else {
             throw new NotImplementedException('error ao buscar o token')
        }
    }
}