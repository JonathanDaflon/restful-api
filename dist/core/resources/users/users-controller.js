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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const users_mongoose_1 = require("./users-mongoose");
const users_service_1 = require("./users-service");
const ok_response_1 = require("../../api/api-response/ok-response");
const generic_controller_1 = require("../../generic/controller/generic-controller");
class UsersController extends generic_controller_1.GenericController {
    constructor() {
        super(users_mongoose_1.User);
    }
    applyRoutes(router) {
        if (router instanceof koa_router_1.default) {
            router.get('/users', this.findAll);
            router.get('/users/:id', this.findByID);
            router.get('/users/email/:email', this.findByEmail);
            router.post('/login', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                const { email, password } = ctx.request.body;
                ctx.body = new ok_response_1.OkResponse({ "accessToken": yield users_service_1.userService.Login(email, password) });
                yield next();
            }));
            router.post('/users', this.newDocument);
            router.put('/users/:id', this.overwriteDocument);
            router.patch('/users/:id', this.updateDocument);
            router.del('/users/:id', this.deleteDocument);
        }
    }
}
exports.usersController = new UsersController();
