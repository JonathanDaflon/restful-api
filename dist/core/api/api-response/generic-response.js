"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericResponse = void 0;
var GenericResponse = /** @class */ (function () {
    function GenericResponse(result, data, error) {
        this.result = false;
        this.data = undefined;
        this.error = undefined;
        this.result = result;
        this.data = data;
        this.error = error;
    }
    GenericResponse.prototype.Data = function (data) {
        this.data = data;
    };
    return GenericResponse;
}());
exports.GenericResponse = GenericResponse;
