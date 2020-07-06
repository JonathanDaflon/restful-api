"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configService = void 0;
const api_config_1 = require("./api-config");
const koa_1 = require("../core/api/koa/koa");
const express_1 = require("../core/api/express/express");
class ConfigService {
    CriarServidor() {
        if (api_config_1.config.deploy.api == "koa")
            return new koa_1.KoaServer();
        if (api_config_1.config.deploy.api == "express")
            return new express_1.ExpressServer();
        return null;
    }
}
exports.configService = new ConfigService();
