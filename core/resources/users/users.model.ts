import { BaseModel } from '../../generic/model/base-model';

export interface IUser extends BaseModel {
    name: string,
    email: string,
    password: string,
    gender: string
}