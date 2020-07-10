import { MyHeroException } from './../../api/exception/my-hero-exception';
import * as bcrypt from 'bcrypt'
import { User } from './users.mongoose'
import { koaJwtService } from '../../auth/jwt/koa-jwt.service'
import { GenericService } from '../../generic/service/generic.service'
import { IUser } from './users.model'

export interface IUserService {
    Login(email: string, senha: string): Promise<string>
}

export class UserService extends GenericService<IUser> implements IUserService {

    constructor() {
        super(User);
    }

    public async Login(email: string, senha: string): Promise<string> {

        let document = await User.findOne({ email }, '+password')
        if (!document)
            throw new MyHeroException("Invalid Email")

        if (!bcrypt.compareSync(senha, document.password))
            throw new MyHeroException("Senha diferente da cadastrada")

        return koaJwtService.Sign(document.password)
    }

    public async findByEmail(email: string): Promise<IUser> {

        let document = await User.findOne({ email })
        if (!document) {
            throw new MyHeroException("Documento não encontrado")
        }
        return document
    }

    // KoaJwtService
}

export const userService = new UserService()