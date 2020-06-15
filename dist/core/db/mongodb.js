"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConn = exports.MongoDb = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var api_config_1 = require("./../../config/api-config");
var MongoDb = /** @class */ (function () {
    function MongoDb() {
        mongoose_1.default.set('useCreateIndex', true);
        mongoose_1.default.set('useFindAndModify', false);
        // CONNECTION EVENTS
        // When successfully connected
        mongoose_1.default.connection.on('connected', function () {
            console.log("Mongoose default connection open to " + api_config_1.config.mongo.url);
        });
        // If the connection throws an error
        mongoose_1.default.connection.on('error', function (err) {
            console.log('Mongoose default connection error:' + err);
        });
        // When the connection is disconnected
        mongoose_1.default.connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });
        // If the Node process ends, close the Mongoose connection
        process.on('SIGINIT', function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    }
    // Create the database connection
    MongoDb.prototype.creatConnection = function () {
        return mongoose_1.default.connect(api_config_1.config.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });
    };
    MongoDb.prototype.disconnect = function () {
        return mongoose_1.default.disconnect();
    };
    return MongoDb;
}());
exports.MongoDb = MongoDb;
exports.mongoConn = new MongoDb();
