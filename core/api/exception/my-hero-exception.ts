export class MyHeroException implements Error {
    
    name: string;
    message: string;
    stack?: string | undefined;

    constructor(message: string) {

        this.name = "MyHeroException";
        this.message = message;
    }
}