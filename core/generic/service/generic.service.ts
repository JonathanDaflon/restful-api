import { BaseModel } from './../model/base-model';
import { GenericDataAccess } from '../data-access/data.access';
import * as mongoose from 'mongoose'

export class GenericService<T extends BaseModel> {

    protected genericDataAccess: GenericDataAccess<T>

    constructor(protected model: mongoose.Model<T>) {
        this.genericDataAccess = new GenericDataAccess(model)
    }

    findAll = async () => {
        let document = await this.genericDataAccess.findAll()
        return document
    }

    findByID = async (_id: any) => {
        let document = await this.genericDataAccess.findByID( _id )
        return document
    }

    newDocument = async (document: any) => {
        document = await this.genericDataAccess.create(document)
        return document
    }

    overwriteDocument = async (_id: any, document: any) => {
        document = await this.genericDataAccess.overwrite(_id, document)
        return document
    }

    updateDocument = async (_id: any, document: any) => {
        document = await this.genericDataAccess.update(_id, document)
        return document
    }

    deleteDocument = async (document: any) => {
        await this.genericDataAccess.delete({ _id: document })
    }

}
