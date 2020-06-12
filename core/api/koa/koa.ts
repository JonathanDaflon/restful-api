import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-body'
import cors from '@koa/cors';
import koaLogger from 'koa-logger'
import { config } from '../../../config/api-config'
import { GenericController } from './../../generic/controller/generic-controller';
import { GenericResponse } from './../api-response/generic-response';
import { BaseModel } from '../../generic/model/base-model';

export class KoaServer {
    
    public app: Koa
    public router: KoaRouter

    constructor () {
        this.app = module.exports = new Koa()
        this.router = new KoaRouter()

        this.app.use(cors())
                .use(koaBody())
                .use(koaLogger())

        //middleware
        this.app.use(async (ctx: Koa.Context, next: Koa.Next) => {
            try {

                await next()
            } catch (err) {
                ctx.status = err.status || 500
                ctx.body = new GenericResponse(false, undefined, err.msg)
                ctx.app.emit('error', err, ctx)
            }
        })

        this.app.on('error', async (err: Error, ctx: Koa.Context) => {

            /* centralized error handling:
             *   console.log error
             *   write error to log file
             *   save error and request information to database if ctx.request match condition
             *   ...
            */

            if (config.koa.debug) {
                console.log('koa middleware - error ->')
                console.log(err)
            }
        })

        // Custom 401 handling if you don't want to expose koa-jwt errors to users
        this.app.use(async (ctx: Koa.Context, next: Koa.Next) => {
            return next().catch( (err) => {
                if (401 == err.status) {
                    ctx.status = 401
                    ctx.body = 'Protected resource, use Authorization header to get access'
                } else {
                    throw err
                }
            })
        })

        // Middleware below this line is only reached if JWT token is valid

        this.router.prefix(config.koa.prefix)
        this.router.get('/status', async (ctx: Koa.Context, next: Koa.Next) => {
            ctx.body = new GenericResponse(true, 'Servidor Online', undefined)
        })
        
    }

    applyRoutes(controllers: GenericController<BaseModel>[]) {

        for (let controller of controllers) {
            controller.applyRoutes(this.router)
        }

        this.app.use(this.router.routes())
                .use(this.router.allowedMethods())

        if (config.koa.debug) {
            console.log(`Rotas Disponíveis
            ----------------------------------
            `)

            this.router.stack.map((i: KoaRouter.Layer) =>
            console.log(`http://localhost:${config.koa.port}` + i.path))
        }

    }

    init() {

        const server = this.app.listen(config.koa.port)

        if (config.koa.debug) {
            console.log('Koa Online: ')
            console.log(server.address())
        }

        return server
    }

}