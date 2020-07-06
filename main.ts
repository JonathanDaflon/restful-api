import { IServer } from './core/api/api.model';
import { mongoConn } from './core/db/mongodb';
import { usersController } from './core/resources/users/users.controller';
import { configService } from './config/config-service';

var myServer: IServer | null = configService.CriarServidor();

if (myServer != null) {

    myServer.Init()
    myServer.ApplyRoutes([usersController]);

    mongoConn.creatConnection();
}