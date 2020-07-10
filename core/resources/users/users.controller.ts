import { GenericService } from './../../generic/service/generic.service';
import KoaRouter from 'koa-router'
import { IUser } from './users.model'
import { User } from './users.mongoose';
import { userService, UserService } from './users.service';
import { OkResponse } from '../../api/api-response/ok-response';
import { GenericController } from '../../generic/controller/generic-controller'
import { Context, Next } from 'koa';

class UsersController extends GenericController<IUser, UserService> {

    constructor() {
        super(User, UserService)
    }

    applyRoutes(router: KoaRouter<any, {}> | undefined): void {

        this.httpService.Apply(router)

        this.httpService.Get('/users', this.findAll)

        this.httpService.Get('/users/:id', this.findByID)

        this.httpService.Get('/users/email/:email', async (ctx: Context, next: Next) => {

            const { email } = ctx.params
            ctx.body = new OkResponse(
                { "usuário": await userService.findByEmail(email) })

            await next()
        })

        this.httpService.Post('/users', this.newDocument)

        this.httpService.Post('/login', async (ctx: Context, next: Next) => {
            const { email, password } = ctx.request.body

            ctx.body = new OkResponse(
                { "accessToken": await userService.Login(email, password) })

            await next()
        })

        this.httpService.Put('/users/:id', this.overwriteDocument)
        this.httpService.Patch('/users/:id', this.updateDocument)
        this.httpService.Del('/users/:id', this.deleteDocument)
    }
}

export const usersController = new UsersController()