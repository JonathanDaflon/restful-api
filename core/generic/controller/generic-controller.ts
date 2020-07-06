import { MyHeroException } from './../../api/exception/my-hero-exception';
import { OkResponse } from './../../api/api-response/ok-response';
import KoaRouter from 'koa-router';
import * as mongoose from 'mongoose';
import { Context, Next } from 'koa';
import { BaseModel } from '../model/base-model';
import { HttpService } from '../http/http-factory';

export abstract class GenericController<T extends BaseModel> {

    protected httpService:  HttpService ;

    constructor(protected model: mongoose.Model<T>) {
        this.httpService = new HttpService();
    }

    applyRoutes(koaRouter: KoaRouter<any, {}>): void {
        throw new MyHeroException("Method not implemented.");
    }


    findAll = async (ctx: Context, next: Next) => {
        ctx.body = new OkResponse(await this.model.find())
        next()
    }

    findByID = async (ctx: Context, next: Next) => {

        let a = await this.model.findById({ _id: ctx.params.id })

        if (a != null || undefined) {
            ctx.body = new OkResponse(a)
            next()
        }
    }

    newDocument = async (ctx: Context, next: Next) => {

        let document = new this.model(ctx.request.body)
        await document.save().then(doc => {
            ctx.body = new OkResponse(doc)
        })
    }

    overwriteDocument = async (ctx: Context, next: Next) => {
        const options = { runValidators: true, overwrite: true }
        await this.model.findByIdAndUpdate(ctx.params.id, ctx.request.body, options)
            .then(document => {
                if (document) {
                    ctx.body = new OkResponse(document)
                    next()
                }
            })
    }

    updateDocument = async (ctx: Context, next: Next) => {

        const options = { runValidators: true, new: true }
        await this.model.findByIdAndUpdate(ctx.params.id, ctx.request.body, options)
            .then(document => {
                if (document) {
                    ctx.body = new OkResponse(document)
                    next()
                }
            })

    }

    deleteDocument = async (ctx: Context, next: Next) => {

        await this.model.remove({ _id: ctx.params.id }).exec().then(results => {
            if (results.n) {
                new OkResponse('Documento excluído')
                next()
            }
        })
    }
}