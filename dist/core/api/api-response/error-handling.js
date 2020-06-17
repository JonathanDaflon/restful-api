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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var api_config_1 = require("../../../config/api-config");
// A centralized Error Handler
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    // Catch all errors thrown by ctx.throw then emit 'error' event
    ErrorHandler.prototype.catcher = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, next()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        ctx.type = 'json';
                        ctx.status = parseInt(err_1.status, 10) || ctx.status || 500;
                        ctx.app.emit('error', err_1, ctx);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Handler with a Switch/case for error messages
    ErrorHandler.prototype.handler = function (err, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var response, messages, name_1;
            return __generator(this, function (_a) {
                response = {};
                // Build response or do whatever you want depending on the type of error 
                switch (err.name) {
                    default: {
                        response = { message: err.message };
                    }
                    // A friendly error message for a MongoError exemple
                    case 'MongoError':
                        if (err.message.startsWith('E11000')) {
                            ctx.status = 400;
                            response = {
                                message: "esse email já está em uso"
                            };
                            break;
                        }
                    // Here all the validations errors from Mongoose will be printed into a json object
                    case 'ValidationError':
                        if (err.message.startsWith('User validation')) {
                            ctx.status = 400;
                            messages = [];
                            for (name_1 in err.errors) {
                                messages.push({ message: err.errors[name_1].message });
                            }
                            response = {
                                message: messages
                            };
                            break;
                        }
                    // Implementar case autorização negada
                }
                // End processing by sending response
                ctx.body = response;
                if (api_config_1.config.koa.debug) {
                    console.log('koa middleware - error ->');
                    console.log(err);
                }
                return [2 /*return*/];
            });
        });
    };
    return ErrorHandler;
}());
exports.errorHandler = new ErrorHandler();
