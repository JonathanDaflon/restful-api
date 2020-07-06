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
exports.userService = void 0;
const my_hero_exception_1 = require("./../../api/exception/my-hero-exception");
const bcrypt = __importStar(require("bcrypt"));
const users_mongoose_1 = require("./users.mongoose");
const koa_jwt_service_1 = require("../../auth/jwt/koa-jwt.service");
const generic_service_1 = require("../../generic/service/generic.service");
class UserService extends generic_service_1.GenericService {
    Login(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = yield users_mongoose_1.User.findOne({ email }, '+password');
            if (!document)
                throw new my_hero_exception_1.MyHeroException("Invalid Email");
            if (!bcrypt.compareSync(senha, document.password))
                throw new my_hero_exception_1.MyHeroException("Senha diferente da cadastrada");
            return koa_jwt_service_1.koaJwtService.Sign(document.password);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = yield users_mongoose_1.User.findOne({ email });
            if (!document) {
                throw new my_hero_exception_1.MyHeroException("Documento não encontrado");
            }
            return document;
        });
    }
}
exports.userService = new UserService(users_mongoose_1.User);
