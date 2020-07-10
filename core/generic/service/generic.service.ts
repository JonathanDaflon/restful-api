import { OkResponse } from './../../api/api-response/ok-response';
import { BaseModel } from './../model/base-model';
import * as mongoose from 'mongoose';

export class GenericService<T extends BaseModel>{

    constructor(protected model: mongoose.Model<T>) {
    }

    public findAll = async () => {
        let document = await this.model.find()
        return document
    }

    findByID = async (_id: any) => {

        let document = await this.model.findById({ _id })
        return document
    }

    newDocument = async (document: any) => {

        document = new this.model(document)
        await document.save()
        return document
    }

    overwriteDocument = async (_id: any, document: any) => {

        const options = { runValidators: true, overwrite: true, new: true }
        document = await this.model.findByIdAndUpdate(_id, document, options)
        return document
    }

    updateDocument = async (_id: any, document: any) => {

        const options = { runValidators: true, new: true }
        document = await this.model.findByIdAndUpdate(_id, document, options)
        return document
    }

    deleteDocument = async (document: any) => {

        await this.model.remove({ _id: document }).exec()
    }

}
