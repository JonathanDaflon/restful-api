import { config } from './../../config/api-config';
import { IConn } from './../generic/interface/database';
import { Client } from 'pg'


class PostgresDb implements IConn {

    constructor() {
    }
    query = async (query: string, id?: any) => {

        let conn = new Client({
            connectionString: config.postgres.string
        })

        await conn.connect()
        let document = (await conn.query(query, id)).rows
        await conn.end()
        return document
    }

    async creatConnection(): Promise<void> {
    }
    async disconnect(): Promise<void> {
    }
}

export const postgresConn = new PostgresDb()