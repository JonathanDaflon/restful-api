import { GenericController } from "../generic/controller/generic-controller";
import { BaseModel } from "../generic/model/base-model";

export interface IServer {
    Init() : void;
    ApplyRoutes(controllers: GenericController<BaseModel>[]) : void;
}