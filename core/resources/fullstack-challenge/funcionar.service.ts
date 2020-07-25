import { IFuncionario } from './funcionario.model';
import { GenericService } from '../../generic/service/generic.service'
import { Funcionario } from './funcionario.mongoose';

export interface IFuncionarioService {
}

export class FuncionarioService extends GenericService<IFuncionario> implements IFuncionarioService {

    constructor(){
        super(Funcionario)
    }
}

export const funcionarioService = new FuncionarioService()