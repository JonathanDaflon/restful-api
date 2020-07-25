import { mongoConn } from './../core/db/mongodb';

export const config = {
    deploy : {
        //"koa", "express"
        api : "koa",

        //"mongo", "postgre"
        db: "mongo"
    },
    koa: {
        port: process.env.PORT || 3000,
        prefix: process.env.PREFIX || '/api',
        debug: process.env.DEBUG || true,
    },

    mongo: {
        url: process.env.DB_URL || 'mongodb://localhost/crud-api'
    },

    postgres: {
        string: process.env.DB_URL || 'postgressql://postgres:1234@localhost:5432/postgres'
    },

    //mongoConn, postgresConn
    myConn: mongoConn,

    security: {
        rounds: process.env.SALT_ROUNDS || 10,
        secret: process.env.SECRET || 'jonnyD'
    }
}