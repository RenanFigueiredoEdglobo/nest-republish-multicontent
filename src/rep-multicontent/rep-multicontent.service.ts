import { Logger, Injectable, NotAcceptableException, NotImplementedException } from '@nestjs/common';
import { response } from 'express';
import { InjectModel } from "@nestjs/mongoose";
import { GetToken } from './GetToken/getToken.service';
import { RepMulticontentModule } from './rep-multicontent.module';
import { RepMulticontentModel } from './model/rep-multicontent.model';
import axios from 'axios';
import { ApiMutiContent } from './enum/enumEnv';
@Injectable()
export class RepMulticontentService {
  constructor(
    private readonly GetToken: GetToken,

  ) { }
  async atualizarTodasPaginasMulticontent(body: RepMulticontentModel) {
    const env = body.env
    const getToken = await this.GetToken.getToken(env);
    if (getToken.status == 200) {
      const multiContentItems = await axios.request({
        method: "GET",
        url: ApiMutiContent[env] + body.tenant,
        headers: {
          'Accept': "application/json",
          'Authorization': `${getToken.token_type} ${getToken.access_token}`,
        }
      }).then(async (response) => {
        try {
          const res = response.data.items
          let count: number = 0;
          Logger.log(`-${res.length} matérias a serem republicada`)
          for (let item = 0; item < res.length; item++) {
            if (res[item] && res[item].id && res[item].status.slug === "published") {
              const atualizarMateriaPorID = await this.atualizarMateriaPorID(res[item].id, body)
              if (atualizarMateriaPorID) count++;
            }
          }
          Logger.log(`Das ${res.length} requisitadas na republicação ${count} foram republicadas`)
        } catch (err) {
          Logger.error(err)
          throw new NotAcceptableException(`Erro ao republicar as materias no tenant: ${body.tenant} em ${body.env}`)
        }
      }).catch((errr) => {
        Logger.error(errr)
        throw new NotAcceptableException(`Erro ao consultar as materias no tenant: ${body.tenant} em ${body.env}`)
      })
      return multiContentItems
    } else throw new NotImplementedException('error ao buscar o token, para republicar todas as materias')
  }

  async atualizarMateriaPorID(id: string, body:RepMulticontentModel) {
    const getToken = await this.GetToken.getToken(body.env);
    if (getToken.status === 200) {
      const atualizarMateriaPorID = await axios.request({
        url: `${ApiMutiContent[body.env]}${body.tenant}/${id}`,
        method: "PUT",
        headers: {
          'Accept': "application/json",
          'Authorization': `${getToken.token_type} ${getToken.access_token}`,
        },
        data: {
          status: {
            slug: "published",
            type: "published",
            name: "publicado",
          },
        },
      }).then((response) => {
        Logger.log(`Materia: ${response.data.id} , foi republicada com sucesso ${new Date().toISOString()}`)
        return true
      }).catch((err) => {
        Logger.error(err)
        return false
      })
      return atualizarMateriaPorID
    } else throw new NotImplementedException('error ao buscar o token, para republicar a mateira por ID')
  }
}