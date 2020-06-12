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
exports.OkResponse = void 0;
var generic_response_1 = require("./generic-response");
var OkResponse = /** @class */ (function (_super) {
    __extends(OkResponse, _super);
    function OkResponse(data) {
        return _super.call(this, true, data, undefined) || this;
    }
    return OkResponse;
}(generic_response_1.GenericResponse));
exports.OkResponse = OkResponse;
