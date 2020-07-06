import * as jwt from 'jsonwebtoken'
import { Context, Next } from 'koa';
import { IJwtService } from '../jwt-model/jwt.model';
import { config } from '../../../config/api-config';

class KoaJwtService implements IJwtService {

    Sign(password: string): string {
        return jwt.sign({ sub: password, iss: 'crud-api' }, config.security.secret, { expiresIn: "10h" })
    }

    async Verify(ctx: Context, next: Next) {
    
        if (ctx.url.match(/^\/api\/status/) || ctx.url.match(/^\/api\/login/)) {
            await next()

        } else {
            ExtractTokenAndVerify(ctx, next);
            await next();
        }
    }
}

export const koaJwtService = new KoaJwtService()

function extractToken(ctx: Context, next: Next): string[] {

    let auth = (ctx.headers.authorization == undefined) ? "" : ctx.headers.authorization;
    if (auth.split(' ').length <= 1) {
        console.log("1")
        ctx.throw(400)
    }
    return auth.split(' ');
}

function verify(ctx: Context, token: string) {

    let decoded = jwt.verify(token, config.security.secret)
    if (!decoded) {
        console.log("2")
        ctx.throw(400)

    }

    return decoded;
}

function ExtractTokenAndVerify(ctx: Context, next: Next) {

    let token = extractToken(ctx, next);
    verify(ctx, token[1]);

    (<any>ctx.request).jwtPayload = jwt.verify(token[1], config.security.secret);
}
