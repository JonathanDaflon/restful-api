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
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const api_config_1 = require("../../config/api-config");
const jwt = __importStar(require("jsonwebtoken"));
class JwtService {
    Sign(password) {
        return jwt.sign({ sub: password, iss: 'crud-api' }, api_config_1.config.security.secret, { expiresIn: "10h" });
    }
    Verify(ctx) {
        ExtractTokenAndVerify(ctx);
    }
}
exports.jwtService = new JwtService();
function extractToken(ctx) {
    let auth = (ctx.headers.authorization == undefined) ? "" : ctx.headers.authorization;
    if (auth.split(' ').length <= 1) {
        ctx.throw();
    }
    return auth.split(' ');
}
function verify(ctx, token) {
    let decoded = jwt.verify(token, api_config_1.config.security.secret);
    if (!decoded)
        ctx.throw();
    return decoded;
}
function ExtractTokenAndVerify(ctx) {
    let token = extractToken(ctx);
    verify(ctx, token[1]);
    ctx.request.jwtPayload = jwt.verify(token[1], api_config_1.config.security.secret);
}
