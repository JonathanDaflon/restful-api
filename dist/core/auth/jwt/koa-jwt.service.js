"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.koaJwtService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const api_config_1 = require("../../../config/api-config");
class KoaJwtService {
    Sign(password) {
        return jwt.sign({ sub: password, iss: 'crud-api' }, api_config_1.config.security.secret, { expiresIn: "10h" });
    }
    Verify(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.url.match(/^\/api\/status/) || ctx.url.match(/^\/api\/login/)) {
                yield next();
            }
            else {
                ExtractTokenAndVerify(ctx, next);
                yield next();
            }
        });
    }
}
exports.koaJwtService = new KoaJwtService();
function extractToken(ctx, next) {
    let auth = (ctx.headers.authorization == undefined) ? "" : ctx.headers.authorization;
    if (auth.split(' ').length <= 1) {
        console.log("1");
        ctx.throw(400);
    }
    return auth.split(' ');
}
function verify(ctx, token) {
    let decoded = jwt.verify(token, api_config_1.config.security.secret);
    if (!decoded) {
        console.log("2");
        ctx.throw(400);
    }
    return decoded;
}
function ExtractTokenAndVerify(ctx, next) {
    let token = extractToken(ctx, next);
    verify(ctx, token[1]);
    ctx.request.jwtPayload = jwt.verify(token[1], api_config_1.config.security.secret);
}
