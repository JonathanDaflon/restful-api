"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
var generic_controller_1 = require("../generic/controller/generic-controller");
var users_model_1 = require("./users-model");
var UsersController = /** @class */ (function (_super) {
    __extends(UsersController, _super);
    function UsersController() {
        return _super.call(this, users_model_1.User) || this;
    }
    UsersController.prototype.applyRoutes = function (koaRouter) {
        koaRouter.get('/users', this.findAll);
        koaRouter.get('/users/:id', this.findByID);
        koaRouter.post('/users', this.newDocument);
        koaRouter.put('/users/:id', this.overwriteDocument);
        koaRouter.patch('/users/:id', this.updateDocument);
        koaRouter.del('/users/:id', this.deleteDocument);
    };
    return UsersController;
}(generic_controller_1.GenericController));
exports.usersController = new UsersController();
