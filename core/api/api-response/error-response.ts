import { GenericResponse } from './generic-response';


export class ErrorResponse extends GenericResponse {

    constructor(data: any, ctx: any) {
        super(false, undefined, data)
        ctx.status = 500
    }
}