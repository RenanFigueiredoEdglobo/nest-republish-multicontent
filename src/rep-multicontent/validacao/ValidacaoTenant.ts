import { Body, Injectable, Logger, NotAcceptableException, NotImplementedException } from '@nestjs/common';
import axios from 'axios';
import { GetToken } from '../GetToken/getToken.service';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Client_credentials, urlENVTOKEN } from '../enum/enumEnv';
import { RepMulticontentModel } from '../model/rep-multicontent.model';
import { IgetToken } from '../GetToken/interface/IgetToken'
@Injectable()
@ValidatorConstraint({ async: true })
export class TenantValidador implements ValidatorConstraintInterface {
    async getToken(env: string): Promise<IgetToken> {

        const requetTokent = await axios.request<IgetToken>({
            method: 'POST',
            url: urlENVTOKEN[env],
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: Client_credentials[env].CLIENT_ID,
                client_secret: Client_credentials[env].CLIENT_SECRET
            })
        }).then((response) => ({
            status: response.status,
            access_token: response.data.access_token,
            token_type: response.data.token_type,
            expires_in: response.data.expires_in,
            message: ""
        }))
            .catch((error) => ({
                message: error.response.statusText,
                status: error.response.status,
                access_token: undefined,
                token_type: undefined,
                expires_in: undefined,
            }));
        return requetTokent
    }
    async validate(tenant: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const getToken = await this.getToken("QA")
        if (getToken.status == 200) {
            var options = {
                method: 'GET',
                url: 'https://apis.backstage.qa.globoi.com/api/v2/multi-content/'+tenant,
                headers: {
                    'Accept': "application/json",
                    'Authorization': `${getToken.token_type} ${getToken.access_token}`,
                }
            };
            const request = await axios.request(options).then((response) => {
                if (response.data.items.length !== 0) return true
            }).catch((error) => {
                Logger.error(error);
                return false
            });
            return request
        } else throw new NotImplementedException('error ao buscar o token')

    }

}
export const ValidarTenant = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: TenantValidador
        })
    }
}