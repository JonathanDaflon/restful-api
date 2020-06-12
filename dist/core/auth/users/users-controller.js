"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.usersController = void 0;
var error_response_1 = require("./../../api/api-response/error-response");
var ok_response_1 = require("./../../api/api-response/ok-response");
var generic_controller_1 = require("./../../generic/controller/generic-controller");
var users_model_1 = require("./users-model");
var authenticated_1 = require("./../jwt/authenticated");
var UsersController = /** @class */ (function (_super) {
    __extends(UsersController, _super);
    function UsersController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsersController.prototype.applyRoutes = function (koaRouter) {
        var _this = this;
        koaRouter.get('/users', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.conn.creatConnection()];
                    case 1:
                        _c.sent();
                        _a = ctx;
                        _b = ok_response_1.OkResponse.bind;
                        return [4 /*yield*/, users_model_1.User.find({})];
                    case 2:
                        _a.body = new (_b.apply(ok_response_1.OkResponse, [void 0, _c.sent()]))();
                        return [4 /*yield*/, this.conn.disconnect()];
                    case 3:
                        _c.sent();
                        next();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _c.sent();
                        ctx.body = new error_response_1.ErrorResponse(error_1.message, ctx);
                        next();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        koaRouter.get('/users/:id', function (ctx, next) {
            if (ctx.params.id === null || ctx.params.id === undefined) {
                ctx.status = 404;
                ctx.body = {
                    status: 'error',
                    message: 'this is an error'
                };
                next();
            }
            ctx.body = new ok_response_1.OkResponse({ id: ctx.params.id });
            next();
        });
        koaRouter.post('/users', function (ctx, next) {
            ctx.body = new ok_response_1.OkResponse(ctx.body);
            next();
        });
        koaRouter.put('/users', function (ctx, next) {
            ctx.body = new ok_response_1.OkResponse(ctx.body);
            next();
        });
        koaRouter.delete('/users', function (ctx, next) {
            ctx.body = new ok_response_1.OkResponse(ctx.body);
            next();
        });
        koaRouter.get('/login', authenticated_1.loginMethod);
    };
    return UsersController;
}(generic_controller_1.GenericController));
exports.usersController = new UsersController();
