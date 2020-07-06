import { errorHandler } from './../api-response/error-handling';
import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-body'
import cors from '@koa/cors';
import koaLogger from 'koa-logger'
import { config } from '../../../config/api-config'
import { GenericController } from './../../generic/controller/generic-controller';
import { GenericResponse } from './../api-response/generic-response';
import { BaseModel } from '../../generic/model/base-model';
import jwt from 'koa-jwt'
import { IServer } from '../api.model';

export class KoaServer implements IServer {

    public app: Koa
    public router: KoaRouter

    constructor() {

        this.app = module.exports = new Koa()
        this.router = new KoaRouter()

        this.app.use(cors())
            .use(koaBody())
            .use(koaLogger())
            .use(errorHandler.catcher)
            .use(jwt({ secret: config.security.secret }).unless({ path: ['/api/status', '/api/login'] }));

        this.app.on('error', errorHandler.handler)

        this.router.prefix(config.koa.prefix)
        this.router.get('/status', async (ctx: Koa.Context, next: Koa.Next) => {
            ctx.body = new GenericResponse(true, 'Servidor Online')
        })
    }

    ApplyRoutes(controllers: GenericController<BaseModel>[]) {

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

    Init() {

        const server = this.app.listen(config.koa.port)

        if (config.koa.debug) {
            console.log('Koa Online: ')
            console.log(server.address())
        }

        return server
    }
}