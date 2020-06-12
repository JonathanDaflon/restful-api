import KoaRouter from 'koa-router';
import * as mongoose from 'mongoose';
import { Context, Next } from 'koa';
import { OkResponse } from '../../api/api-response/ok-response';

export abstract class GenericController<T extends mongoose.Document> {
    
    constructor(protected model: mongoose.Model<T>) {
    }

    findAll = async (ctx: Context, next: Next) => {
        
        ctx.body = new OkResponse(await this.model.find())
        
    }
    
    findByID = async (ctx: Context, next: Next) => {
        
        ctx.body = new OkResponse(await this.model.findById({_id: ctx.params.id}))
        
    }

    newDocument = async (ctx: Context, next: Next) => {

        let document = new this.model(ctx.request.body)
        await document.save()
        
        next()
    }
   
    overwriteDocument = async (ctx: Context, next: Next) => {
            
        await this.model.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        next()
    }

    updateDocument = async (ctx: Context, next: Next) => {
            
        await this.model.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        console.log(ctx.request.type)
        next()

    }

    deleteDocument =  async (ctx: Context, next: Next) => {
            
        await this.model.remove({_id: ctx.params.id}).exec().then(results => {
            
            if (results.n) {

                ctx.status = 204
            } else {
                ctx.status = 404
            }  

            console.log(ctx.status)
            next()
        })
        
    }

    applyRoutes(koaRouter: KoaRouter<any, {}>): void {
        throw new Error("Method not implemented.");
    }
}