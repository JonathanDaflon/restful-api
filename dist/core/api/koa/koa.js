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
exports.KoaServer = void 0;
const error_handling_1 = require("./../api-response/error-handling");
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_body_1 = __importDefault(require("koa-body"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const api_config_1 = require("../../../config/api-config");
const generic_response_1 = require("./../api-response/generic-response");
const koa_jwt_1 = __importDefault(require("koa-jwt"));
class KoaServer {
    constructor() {
        this.app = module.exports = new koa_1.default();
        this.router = new koa_router_1.default();
        this.app.use(cors_1.default())
            .use(koa_body_1.default())
            .use(koa_logger_1.default())
            .use(error_handling_1.errorHandler.catcher)
            .use(koa_jwt_1.default({ secret: api_config_1.config.security.secret }).unless({ path: ['/api/status', '/api/login'] }));
        this.app.on('error', error_handling_1.errorHandler.handler);
        this.router.prefix(api_config_1.config.koa.prefix);
        this.router.get('/status', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = new generic_response_1.GenericResponse(true, 'Servidor Online');
        }));
    }
    ApplyRoutes(controllers) {
        for (let controller of controllers) {
            controller.applyRoutes(this.router);
        }
        this.app.use(this.router.routes())
            .use(this.router.allowedMethods());
        if (api_config_1.config.koa.debug) {
            console.log(`Rotas Disponíveis
            ----------------------------------
            `);
            this.router.stack.map((i) => console.log(`http://localhost:${api_config_1.config.koa.port}` + i.path));
        }
    }
    Init() {
        const server = this.app.listen(api_config_1.config.koa.port);
        if (api_config_1.config.koa.debug) {
            console.log('Koa Online: ');
            console.log(server.address());
        }
        return server;
    }
}
exports.KoaServer = KoaServer;
