import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios'
import { Client_credentials, urlENVTOKEN } from '../enum/enumEnv';
import { RepMulticontentModel } from '../model/rep-multicontent.model';
import { IgetToken } from './interface/IgetToken';
@Injectable()
export class GetToken {
    async getToken(env:RepMulticontentModel): Promise<IgetToken> {
        const envAmb = Object.values(env)[0]
        const requetTokent = await axios.request<IgetToken>({
            method: 'POST',
            url: urlENVTOKEN[envAmb],
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: Client_credentials[envAmb].CLIENT_ID,
                client_secret: Client_credentials[envAmb].CLIENT_SECRET
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
}
