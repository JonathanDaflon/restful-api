export interface IJwtService {

    Sign(password: string): string 
    Verify(token: any, resp: any): void
}