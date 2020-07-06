"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const jwt_sign_1 = require("../auth/jwt-sign");
const generic_controller_1 = require("../generic/controller/generic-controller");
const users_model_1 = require("./users-model");
class UsersController extends generic_controller_1.GenericController {
    constructor() {
        super(users_model_1.User);
    }
    applyRoutes(koaRouter) {
        koaRouter.get('/users', this.findAll);
        koaRouter.get('/users/:id', this.findByID);
        koaRouter.get('/users/email/:email', this.findByEmail);
        koaRouter.post('/users/login', jwt_sign_1.login);
        koaRouter.post('/users', this.newDocument);
        koaRouter.put('/users/:id', this.overwriteDocument);
        koaRouter.patch('/users/:id', this.updateDocument);
        koaRouter.del('/users/:id', this.deleteDocument);
    }
}
exports.usersController = new UsersController();
