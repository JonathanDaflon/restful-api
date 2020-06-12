import { mongoConn } from './core/db/mongodb';
import { KoaServer } from './core/api/koa/koa';
import { usersController } from './core/users/users-controller';


export const koaServer = new KoaServer()

koaServer.init()

mongoConn.creatConnection()
         .then( () => koaServer.applyRoutes([usersController]))

