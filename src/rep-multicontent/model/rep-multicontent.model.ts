import { IsEmail, IsNotEmpty, IsString,IsOptional } from "class-validator";
import { EhQAouPROD } from "../validacao/ValidacaoEnv";
import { ValidarTenant } from "../validacao/ValidacaoTenant";

export class RepMulticontentModel {
    @EhQAouPROD({message: "O campo env deve ser PROD ou QA"})
    @IsString({message: "campo env deve ser string com o valor de  QA ou PROD "})
    @IsNotEmpty({ message: 'Campo env nãa pode ser vazio, o valor ser   QA ou PROD' })
    env: string
    
    @ValidarTenant({message: "o tenant não existe"})
    @IsString({message: "campo tenant deve ser string "})
    @IsNotEmpty({ message: 'Campo tenant nãa pode ser vazio,'})
    tenant: string
    
    @IsString({message:"o campo email deve ser uma string"})
    @IsOptional()
    @IsEmail(
        {},
        {
          message: "email precisa ser um endereço de email válido.",
        }
      )
    email: string
}
