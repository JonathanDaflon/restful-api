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
exports.tokenParser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_config_1 = require("../../config/api-config");
exports.tokenParser = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.url.match(/^\/api\/status/) || ctx.url.match(/^\/api\/login/)) {
        yield next();
        return;
    }
    ExtractTokenAndVerify(ctx);
    yield next();
});
function extractToken(ctx) {
    let auth = (ctx.headers.authorization == undefined) ? "" : ctx.headers.authorization;
    if (auth.split(' ').length <= 1) {
        ctx.throw();
    }
    return auth.split(' ');
}
function verify(ctx, token) {
    let decoded = jsonwebtoken_1.default.verify(token, api_config_1.config.security.secret);
    if (!decoded)
        ctx.throw();
    return decoded;
}
function ExtractTokenAndVerify(ctx) {
    let token = extractToken(ctx);
    verify(ctx, token[1]);
    ctx.request.jwtPayload = jsonwebtoken_1.default.verify(token[1], api_config_1.config.security.secret);
}
