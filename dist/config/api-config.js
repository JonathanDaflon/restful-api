"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const mongodb_1 = require("./../core/db/mongodb");
exports.config = {
    deploy: {
        //1 - koa, 2 - express
        api: "koa"
    },
    koa: {
        port: process.env.PORT || 3000,
        prefix: process.env.PREFIX || '/api',
        debug: process.env.DEBUG || true,
    },
    mongo: {
        url: process.env.DB_URL || 'mongodb://localhost/crud-api'
    },
    myConn: mongodb_1.mongoConn,
    security: {
        rounds: process.env.SALT_ROUNDS || 10,
        secret: process.env.SECRET || 'jonnyD'
    }
};
