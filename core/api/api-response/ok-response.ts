import { GenericResponse } from './generic-response';

export class OkResponse extends GenericResponse {

    constructor(data: any) {
        super(true, data)
    }
}