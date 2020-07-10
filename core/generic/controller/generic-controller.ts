import { GenericService } from './../service/generic.service';
import { MyHeroException } from './../../api/exception/my-hero-exception';
import { OkResponse } from './../../api/api-response/ok-response';
import KoaRouter from 'koa-router';
import * as mongoose from 'mongoose';
import { Context, Next } from 'koa';
import { BaseModel } from '../model/base-model';
import { HttpService } from '../http/http-factory';

export abstract class GenericController<T extends BaseModel, S extends GenericService<T>> {

    protected httpService: HttpService
    protected genericService: S

    constructor(protected model: mongoose.Model<T>, SCreator: (new () => S)) {
        this.httpService = new HttpService()
        this.genericService = new SCreator()
    }

    applyRoutes(koaRouter: KoaRouter<any, {}>): void {
        throw new MyHeroException("Method not implemented.");
    }

    findAll = async (ctx: Context, next: Next) => {
        ctx.body = new OkResponse(await this.genericService.findAll())
        next()
    }

    findByID = async (ctx: Context, next: Next) => {
        ctx.body = new OkResponse(await this.genericService.findByID(ctx.params.id))
        next()
    }

    newDocument = async (ctx: Context, next: Next) => {

        ctx.body = new OkResponse(await this.genericService.newDocument(ctx.request.body))
        next()
    }

    overwriteDocument = async (ctx: Context, next: Next) => {

        ctx.body = new OkResponse(await this.genericService.overwriteDocument(ctx.params.id, ctx.request.body))
        next()
    }

    updateDocument = async (ctx: Context, next: Next) => {

        ctx.body = new OkResponse(await this.genericService.updateDocument(ctx.params.id, ctx.request.body))
        next()
    }

    deleteDocument = async (ctx: Context, next: Next) => {

        await this.genericService.deleteDocument(ctx.params.id)
        ctx.body = new OkResponse("Documento deletado com sucesso!")
        next()
    }
}