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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoaServer = void 0;
var koa_1 = __importDefault(require("koa"));
var koa_router_1 = __importDefault(require("koa-router"));
var koa_body_1 = __importDefault(require("koa-body"));
var cors_1 = __importDefault(require("@koa/cors"));
var koa_logger_1 = __importDefault(require("koa-logger"));
var api_config_1 = require("../../../config/api-config");
var generic_response_1 = require("./../api-response/generic-response");
var KoaServer = /** @class */ (function () {
    function KoaServer() {
        var _this = this;
        this.app = module.exports = new koa_1.default();
        this.router = new koa_router_1.default();
        this.app.use(cors_1.default())
            .use(koa_body_1.default())
            .use(koa_logger_1.default());
        //middleware
        this.app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, next()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        ctx.status = err_1.status || 500;
                        ctx.body = new generic_response_1.GenericResponse(false, undefined, err_1.msg);
                        ctx.app.emit('error', err_1, ctx);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.app.on('error', function (err, ctx) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /* centralized error handling:
                 *   console.log error
                 *   write error to log file
                 *   save error and request information to database if ctx.request match condition
                 *   ...
                */
                if (api_config_1.config.koa.debug) {
                    console.log('koa middleware - error ->');
                    console.log(err);
                }
                return [2 /*return*/];
            });
        }); });
        // Custom 401 handling if you don't want to expose koa-jwt errors to users
        this.app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, next().catch(function (err) {
                        if (401 == err.status) {
                            ctx.status = 401;
                            ctx.body = 'Protected resource, use Authorization header to get access';
                        }
                        else {
                            throw err;
                        }
                    })];
            });
        }); });
        // Middleware below this line is only reached if JWT token is valid
        this.router.prefix(api_config_1.config.koa.prefix);
        this.router.get('/status', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ctx.body = new generic_response_1.GenericResponse(true, 'Servidor Online', undefined);
                return [2 /*return*/];
            });
        }); });
    }
    KoaServer.prototype.applyRoutes = function (controllers) {
        for (var _i = 0, controllers_1 = controllers; _i < controllers_1.length; _i++) {
            var controller = controllers_1[_i];
            controller.applyRoutes(this.router);
        }
        this.app.use(this.router.routes())
            .use(this.router.allowedMethods());
        if (api_config_1.config.koa.debug) {
            console.log("Rotas Dispon\u00EDveis\n            ----------------------------------\n            ");
            this.router.stack.map(function (i) {
                return console.log("http://localhost:" + api_config_1.config.koa.port + i.path);
            });
        }
    };
    KoaServer.prototype.init = function () {
        var server = this.app.listen(api_config_1.config.koa.port);
        if (api_config_1.config.koa.debug) {
            console.log('Koa Online: ');
            console.log(server.address());
        }
        return server;
    };
    return KoaServer;
}());
exports.KoaServer = KoaServer;
