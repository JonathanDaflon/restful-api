export class GenericResponse {
    private result: boolean = false
    private data: any = undefined

    constructor(result: boolean, data: any) {
        this.result = result
        this.data = data
    }
    Data(data: any) {
        this.data = data;
    }
}