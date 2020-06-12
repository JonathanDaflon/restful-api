import mongoose, { mongo, disconnect } from 'mongoose'
import { IConn } from './../generic/interface/database';
import { config } from './../../config/api-config';

export class MongoDb implements IConn {

    constructor() {

        mongoose.Promise = global.Promise
        mongoose.set('useCreateIndex', true)
        mongoose.set('useFindAndModify', false)

        // CONNECTION EVENTS
        
        // When successfully connected
        mongoose.connection.on('connected', () => {
            console.log(`Mongoose default connection open to ${config.mongo.url}`)
        })

        // If the connection throws an error
            mongoose.connection.on('error', (err: any) => {
                console.log('Mongoose default connection error:' + err)
            })
        // When the connection is disconnected
            mongoose.connection.on('disconnected', () => {
                console.log('Mongoose default connection disconnected')
            })

        // If the Node process ends, close the Mongoose connection
            process.on('SIGINIT', () => {
                console.log('Mongoose default connection disconnected through app termination')
                process.exit(0)
            })
    }

    // Create the database connection
    creatConnection(): Promise<any> {
        return mongoose.connect(config.mongo.url, {useNewUrlParser:true, useUnifiedTopology: true})
    }

    disconnect() {
        return mongoose.disconnect()
    }
}

export const mongoConn = new MongoDb();