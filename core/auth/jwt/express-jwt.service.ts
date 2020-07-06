import { IJwtService } from "../jwt-model/jwt.model";
import * as jwt from 'jsonwebtoken'
import { config } from "../../../config/api-config";

class ExpressJwtService implements IJwtService {
    
    Sign(password: string): string {
        return jwt.sign({ sub: password, iss: 'crud-api' }, config.security.secret, { expiresIn: "10h" })
    }

    Verify(): void {
        //implementar
    }
}

export const expressJwtService = new ExpressJwtService()