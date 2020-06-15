import { OkResponse } from './../../api/api-response/ok-response';
import { ErrorResponse } from './../../api/api-response/error-response';
import KoaRouter from 'koa-router';
import * as mongoose from 'mongoose';
import { Context, Next } from 'koa';

export abstract class GenericController<T extends mongoose.Document> {
    
    constructor(protected model: mongoose.Model<T>) {
    }
    
    applyRoutes(koaRouter: KoaRouter<any, {}>): void {
        throw new Error("Method not implemented.");
    }

    
    findAll = async (ctx: Context, next: Next) => {
        try {
            ctx.body = new OkResponse(await this.model.find())
        } catch (err) {
            
            // Falta implementar validação JWT error 401
            ctx.body = new ErrorResponse(err.message, ctx)
            ctx.throw(err)
        }
        
    }

    // Find a document of the Resource
    findByID = async (ctx: Context, next: Next) => {
        
        try{
            // Captures the document in a variable
            let a = await this.model.findById({_id: ctx.params.id})

            // If Document exists
            if (a != null || undefined) {
                ctx.body = new OkResponse(a)  
                next()
            }

            } catch (err) {
                ctx.body = new ErrorResponse(err.message, ctx)
                ctx.throw(err)
        }    
        
    }

    newDocument = async (ctx: Context, next: Next) => {

        try {
            let document = new this.model(ctx.request.body)
            ctx.body = new OkResponse(await document.save())

        } catch (err) {
            ctx.body = new ErrorResponse(err.message, ctx)
            ctx.throw(err)
        }
    }
   
    overwriteDocument = async (ctx: Context, next: Next) => {
        try{
            const options = {runValidators: true, overwrite: true}
            await this.model.findByIdAndUpdate(ctx.params.id, ctx.request.body, options)
            .then(document => {
                if (document) {
                    ctx.body = new OkResponse(document)
                    next()
                } else {
                    ctx.throw()
                }
            })

        } catch (err) {
            ctx.body = new ErrorResponse(err.message, ctx)
            ctx.throw(err)
        }
    }
    
    updateDocument = async (ctx: Context, next: Next) => {
        try {
            const options = {runValidators: true, new: true}
            await this.model.findByIdAndUpdate(ctx.params.id, ctx.request.body, options)
            .then(document => {
                if (document) {
                    ctx.body = new OkResponse(document)
                    next()
                } else {
                    ctx.throw()
                }
            })

        } catch (err) {
            ctx.body = new ErrorResponse(err.message, ctx)
            ctx.throw(err)
        }

    }

    deleteDocument =  async (ctx: Context, next: Next) => {
        try {
            await this.model.remove({_id: ctx.params.id}).exec().then(results => {
                if (results.n) {
                    new OkResponse('Documento excluído')
                    next()
                } else {
                    ctx.throw()
                }  
            })
        } catch (err) {
            ctx.body = new ErrorResponse(err.message, ctx)
            ctx.throw(err)
        }
        
    }

}