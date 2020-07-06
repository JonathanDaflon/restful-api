import { BaseModel } from './../model/base-model';
import * as mongoose from 'mongoose';

export class GenericService<T extends BaseModel>{


    constructor(protected model: mongoose.Model<T>) {
    }

    find = async () => {
        await this.model.find()
    }

}