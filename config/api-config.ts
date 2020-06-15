import { mongoConn } from './../core/db/mongodb';

export const config = {
    koa: {
        port: process.env.PORT || 3000,
        prefix: process.env.PREFIX || '/api',
        debug: process.env.DEBUG || true,
        secret: process.env.SECRET || 'jonnyD'
    },

    mongo: {
        url: process.env.DB_URL || 'mongodb://localhost/crud-api'
    },

    myConn: mongoConn,

    security: process.env.SALT_ROUNDS || 10,
}