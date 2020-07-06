import { config } from "./api-config";
import { KoaServer } from "../core/api/koa/koa";
import { IServer } from "../core/api/api.model";
import { ExpressServer } from "../core/api/express/express";

class ConfigService {

    CriarServidor() : IServer | null {
        
        if (config.deploy.api == "koa")
            return new KoaServer()

        if (config.deploy.api == "express")
            return new ExpressServer()

        return null;
    }
}

export const configService = new ConfigService();