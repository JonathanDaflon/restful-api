export class GenericResponse {
    private result: boolean = false
    private data: any = undefined
    private error: any = undefined

    constructor(result: boolean, data: any, error: any) {
        this.result = result
        this.data = data
        this.error = error
    }
}