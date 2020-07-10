import { GenericService } from './../generic/service/generic.service';
import { GenericController } from "../generic/controller/generic-controller";
import { BaseModel } from "../generic/model/base-model";

export interface IServer {
    Init() : void;
    ApplyRoutes(controllers: GenericController<BaseModel, GenericService<BaseModel>>[]) : void;
}