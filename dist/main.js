"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.koaServer = void 0;
var mongodb_1 = require("./core/db/mongodb");
var koa_1 = require("./core/api/koa/koa");
var users_controller_1 = require("./core/users/users-controller");
exports.koaServer = new koa_1.KoaServer();
exports.koaServer.init();
mongodb_1.mongoConn.creatConnection()
    .then(function () { return exports.koaServer.applyRoutes([users_controller_1.usersController]); });
