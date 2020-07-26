"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_mongoose_1 = require("./core/resources/users/users.mongoose");
const funcionario_controller_1 = require("./core/resources/fullstack-challenge/funcionario.controller");
const mongodb_1 = require("./core/db/mongodb");
const users_controller_1 = require("./core/resources/users/users.controller");
const config_service_1 = require("./config/config-service");
var myServer = config_service_1.configService.CriarServidor();
if (myServer != null) {
    myServer.Init();
    myServer.ApplyRoutes([users_controller_1.usersController, funcionario_controller_1.funcionarioController]);
    mongodb_1.mongoConn.creatConnection().then(() => {
        users_mongoose_1.User.find({ 'name': 'admin' }).then(r => {
            if (!r) {
                let admin = new users_mongoose_1.User({
                    'name': 'admin',
                    'email': 'admin@admin',
                    'password': 'admin',
                    'gender': 'Male'
                });
                admin.save();
            }
        });
    });
}
