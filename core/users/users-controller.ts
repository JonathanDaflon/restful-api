import KoaRouter from 'koa-router'
import { GenericController } from '../generic/controller/generic-controller'
import { User, IUser } from './users-model'


// An exemple of how to implement a Resource using the Mongoose model and super
class UsersController extends GenericController<IUser> {
    
    constructor() {
        super(User)
    }

    applyRoutes(koaRouter: KoaRouter<any, {}>): void {

        koaRouter.get('/users', this.findAll)
       
        koaRouter.get('/users/:id', this.findByID)

        koaRouter.post('/users', this.newDocument)

        koaRouter.put('/users/:id', this.overwriteDocument)

        koaRouter.patch('/users/:id', this.updateDocument)

        koaRouter.del('/users/:id', this.deleteDocument)

    }
}
    export const usersController = new UsersController()