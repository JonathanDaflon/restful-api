import { FuncionarioService } from './funcionar.service';
import KoaRouter from 'koa-router'
import { IFuncionario } from './funcionario.model';
import { GenericController } from '../../generic/controller/generic-controller'
import { Funcionario } from './funcionario.mongoose';

class FuncionarioController extends GenericController<IFuncionario, FuncionarioService> {

    constructor() {
        super(Funcionario, FuncionarioService)
    }

    applyRoutes(router: KoaRouter<any, {}> | undefined): void {

        this.httpService.Apply(router)
        this.httpService.Get('/funcionario', this.findAll)
        this.httpService.Get('/funcionario/:id', this.findByID)
        this.httpService.Post('/funcionario', this.newDocument)
        this.httpService.Put('/funcionario/:id', this.overwriteDocument)
        this.httpService.Patch('/funcionario/:id', this.updateDocument)
        this.httpService.Del('/funcionario/:id', this.deleteDocument)
    }
}

export const funcionarioController = new FuncionarioController()