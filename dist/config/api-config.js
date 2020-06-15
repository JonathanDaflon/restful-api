"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var mongodb_1 = require("./../core/db/mongodb");
exports.config = {
    koa: {
        port: process.env.PORT || 3000,
        prefix: process.env.PREFIX || '/api',
        debug: process.env.DEBUG || true,
        secret: process.env.SECRET || 'jonnyD'
    },
    mongo: {
        url: process.env.DB_URL || 'mongodb://localhost/crud-api'
    },
    myConn: mongodb_1.mongoConn,
    security: process.env.SALT_ROUNDS || 10,
};
