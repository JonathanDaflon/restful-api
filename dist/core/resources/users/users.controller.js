"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const users_mongoose_1 = require("./users.mongoose");
const users_service_1 = require("./users.service");
const ok_response_1 = require("../../api/api-response/ok-response");
const generic_controller_1 = require("../../generic/controller/generic-controller");
class UsersController extends generic_controller_1.GenericController {
    constructor() {
        super(users_mongoose_1.User);
    }
    applyRoutes(router) {
        this.httpService.Apply(router);
        this.httpService.Get('/users', this.findAll);
        this.httpService.Get('/users/:id', this.findByID);
        this.httpService.Get('/users/email/:email', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = ctx.params;
            ctx.body = new ok_response_1.OkResponse({ "usuário": yield users_service_1.userService.findByEmail(email) });
            yield next();
        }));
        this.httpService.Post('/users', this.newDocument);
        this.httpService.Post('/login', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = ctx.request.body;
            ctx.body = new ok_response_1.OkResponse({ "accessToken": yield users_service_1.userService.Login(email, password) });
            yield next();
        }));
        this.httpService.Put('/users/:id', this.overwriteDocument);
        this.httpService.Patch('/users/:id', this.updateDocument);
        this.httpService.Del('/users/:id', this.deleteDocument);
    }
}
exports.usersController = new UsersController();
