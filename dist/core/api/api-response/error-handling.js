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
exports.errorHandler = void 0;
const api_config_1 = require("../../../config/api-config");
const error_response_1 = require("./error-response");
class ErrorHandler {
    catcher(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield next();
            }
            catch (err) {
                ctx.status = 200;
                ctx.app.emit('error', err, ctx);
            }
        });
    }
    handler(err, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = new error_response_1.ErrorResponse(err.message, ctx);
            switch (err.name) {
                case 'MongoError':
                    let mongoError = err;
                    if (mongoError.message.startsWith('E11000')) {
                        response.Data(mongoError.message);
                        break;
                    }
                case 'ValidationError':
                    let validationError = err;
                    if (err.message.startsWith('User validation')) {
                        if (Array.isArray(validationError.errors)) {
                            let messages = [];
                            for (let i = 0; i < validationError.errors.length; i++) {
                                messages.push(validationError.errors[i].message);
                            }
                            response.Data(messages);
                            break;
                        }
                    }
                //#region MyHeroException
                case 'MyHeroException':
                    if (err.message == "Invalid Email") {
                        response.Data("Esse email não está cadastrado");
                        break;
                    }
                //#endregion
                case 'UnauthorizedError':
                    if (err.message.startsWith('Authentication Error')) {
                        response.Data("Credenciais Inválidas");
                        break;
                    }
                    if (err.message.startsWith('Unauthorized')) {
                        response.Data(err.message);
                        break;
                    }
            }
            ctx.body = response;
            if (api_config_1.config.koa.debug) {
                console.log('koa middleware - error ->');
                console.log(err);
            }
        });
    }
}
exports.errorHandler = new ErrorHandler();
