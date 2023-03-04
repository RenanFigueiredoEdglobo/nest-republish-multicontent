import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class EnvValidador implements ValidatorConstraintInterface {
    async validate(
        env: any,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {
        if(env == "QA")return true
        else if(env=="PROD")return true
        else return false
    }
}
export const EhQAouPROD = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
      registerDecorator({
        target: objeto.constructor,
        propertyName: propriedade,
        options: opcoesDeValidacao,
        constraints: [],
        validator: EnvValidador,
      });
    };
  };