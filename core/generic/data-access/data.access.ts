import { postgresConn } from './../../db/postgres';
import { BaseModel } from './../model/base-model';
import * as mongoose from 'mongoose';

import { config } from '../../../config/api-config';

export class GenericDataAccess<T extends BaseModel> {

    constructor(protected model: mongoose.Model<T>) {
    }

    findAll = async () => {

        let document = null

        if (config.deploy.db == "mongo")
            document = await this.model.find()

        if (config.deploy.db == "postgre")
            document = await postgresConn.query('SELECT * from public.user')

        return document

    }

    findByID = async (_id: any) => {

        let document = null

        if (config.deploy.db == "mongo")
            document = await this.model.findById({ _id })

        if (config.deploy.db == "postgre")
            document = await postgresConn.query(`SELECT * from public.user where id = ${_id};`)

        return document
    }

    create = async (document: any) => {

        document = new this.model(document)
        await document.save()
        return document

        // if (this.model === postgre.Model) {
        // faz uma query aew moço
        // }
    }

    overwrite = async (_id: any, document: any) => {

        const options = { runValidators: true, overwrite: true, new: true }
        document = await this.model.findByIdAndUpdate(_id, document, options)
        return document

        // if (this.model === postgre.Model) {
        // faz uma query aew moço
        // }
    }

    update = async (_id: any, document: any) => {

        const options = { runValidators: true, new: true }
        document = await this.model.findByIdAndUpdate(_id, document, options)
        return document

        // if (this.model === postgre.Model) {
        // faz uma query aew moço
        // }
    }

    delete = async (document: any) => {

        await this.model.deleteOne({ _id: document })

        // if (this.model === postgre.Model) {
        // faz uma query aew moço
        // }
    }
}

