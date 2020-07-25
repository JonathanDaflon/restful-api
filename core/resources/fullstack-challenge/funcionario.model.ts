import { BaseModel } from '../../generic/model/base-model';

export interface IFuncionario extends BaseModel {
    nome: string,
    sobrenome: string,
    participacao: number
}