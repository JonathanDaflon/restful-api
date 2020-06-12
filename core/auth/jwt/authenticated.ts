import jwt from 'jsonwebtoken'
import { config } from '../../../config/api-config';

export const authMethod = async (ctx: any, next: any) => {

    if (!ctx.headers.authorization) {
        ctx.throw(403, 'No token');
    }

    const token = ctx.headers.authorization.split(' ')[1]

    try {
        ctx.request.jwtPayLoad = jwt.verify(token, config.koa.secret)

    } catch (err) {
        ctx.throw (err.status || 403, err.text)
    }

    await next()
}

export const loginMethod =(ctx:any, next: any) => {

    let user = {
        userId: 'idExample',
        name: 'nameExample'
    }

    ctx.body = {
        token: jwt.sign(user, config.koa.secret, { expiresIn: '24h'})
    }
}
