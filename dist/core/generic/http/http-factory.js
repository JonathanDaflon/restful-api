"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
const koa_jwt_service_1 = require("./../../auth/jwt/koa-jwt.service");
const koa_router_1 = __importDefault(require("koa-router"));
class HttpService {
    Apply(router) {
        this.router = router;
    }
    Prefix(prefix) {
        if (this.router instanceof koa_router_1.default)
            this.router.prefix(prefix);
    }
    Get(url, method) {
        if (this.router instanceof koa_router_1.default)
            this.router.get(url, koa_jwt_service_1.koaJwtService.Verify, method);
    }
    Post(url, method) {
        if (this.router instanceof koa_router_1.default)
            this.router.post(url, koa_jwt_service_1.koaJwtService.Verify, method);
    }
    Put(url, method) {
        if (this.router instanceof koa_router_1.default)
            this.router.put(url, koa_jwt_service_1.koaJwtService.Verify, method);
    }
    Patch(url, method) {
        if (this.router instanceof koa_router_1.default)
            this.router.patch(url, koa_jwt_service_1.koaJwtService.Verify, method);
    }
    Del(url, method) {
        if (this.router instanceof koa_router_1.default)
            this.router.del(url, koa_jwt_service_1.koaJwtService.Verify, method);
    }
}
exports.HttpService = HttpService;
