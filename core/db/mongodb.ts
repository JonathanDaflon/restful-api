import mongoose from 'mongoose'
import { IConn } from './../generic/interface/database';
import { config } from './../../config/api-config';

export class MongoDb implements IConn {

    constructor() {

        mongoose.set('useCreateIndex', true)
        mongoose.set('useFindAndModify', false)

        mongoose.connection.on('connected', () => {
            console.log(`Mongoose default connection open to ${config.mongo.url}`)
        })

        mongoose.connection.on('error', (err: any) => {
            console.log('Mongoose default connection error:' + err)
        })

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected')
        })

        process.on('SIGINIT', () => {
            console.log('Mongoose default connection disconnected through app termination')
            process.exit(0)
        })
    }

    creatConnection(): Promise<any> {
        return mongoose.connect(config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    disconnect() {
        return mongoose.disconnect()
    }
}

export const mongoConn = new MongoDb();