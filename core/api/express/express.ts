import { GenericService } from './../../generic/service/generic.service';
import { BaseModel } from './../../generic/model/base-model';
import { IServer } from "../api.model";
import { GenericController } from "../../generic/controller/generic-controller";

export class ExpressServer implements IServer {

    Init(): void {
        throw new Error("Method not implemented.");
    }

    ApplyRoutes(controllers: GenericController<BaseModel, GenericService<BaseModel>>[]): void {
        throw new Error("Method not implemented.");
    }
}