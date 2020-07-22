import { koaJwtService } from '../../auth/jwt/koa-jwt.service';
import KoaRouter from 'koa-router';

export class HttpService {

    private router: KoaRouter<any, {}> | undefined;

    Apply(router: KoaRouter<any, {}> | undefined) {
        this.router = router;
    }

    Prefix(prefix: string) {
        if (this.router instanceof KoaRouter)
            this.router.prefix(prefix);
    }

    Get(url: string, method: any) {
        if (this.router instanceof KoaRouter)
            this.router.get(url, koaJwtService.Verify, method);
    }

    Post(url: string, method: any) {
        if (this.router instanceof KoaRouter)
            this.router.post(url, koaJwtService.Verify, method);
    }

    Put(url: string, method: any) {
        if (this.router instanceof KoaRouter)
            this.router.put(url, koaJwtService.Verify, method);
    }

    Patch(url: string, method: any) {
        if (this.router instanceof KoaRouter)
            this.router.patch(url, koaJwtService.Verify, method);
    }

    Del(url: string, method: any) {
        if (this.router instanceof KoaRouter)
            this.router.del(url, koaJwtService.Verify, method);
    }
}