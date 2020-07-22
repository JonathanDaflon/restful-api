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
exports.GenericController = void 0;
const my_hero_exception_1 = require("./../../api/exception/my-hero-exception");
const ok_response_1 = require("./../../api/api-response/ok-response");
const http_factory_1 = require("../http/http.factory");
class GenericController {
    constructor(model, SCreator) {
        this.model = model;
        this.findAll = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = new ok_response_1.OkResponse(yield this.genericService.findAll());
            next();
        });
        this.findByID = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = new ok_response_1.OkResponse(yield this.genericService.findByID(ctx.params.id));
            next();
        });
        this.newDocument = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = new ok_response_1.OkResponse(yield this.genericService.newDocument(ctx.request.body));
            next();
        });
        this.overwriteDocument = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = new ok_response_1.OkResponse(yield this.genericService.overwriteDocument(ctx.params.id, ctx.request.body));
            next();
        });
        this.updateDocument = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = new ok_response_1.OkResponse(yield this.genericService.updateDocument(ctx.params.id, ctx.request.body));
            next();
        });
        this.deleteDocument = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.genericService.deleteDocument(ctx.params.id);
            ctx.body = new ok_response_1.OkResponse("Documento deletado com sucesso!");
            next();
        });
        this.httpService = new http_factory_1.HttpService();
        this.genericService = new SCreator();
    }
    applyRoutes(koaRouter) {
        throw new my_hero_exception_1.MyHeroException("Method not implemented.");
    }
}
exports.GenericController = GenericController;
