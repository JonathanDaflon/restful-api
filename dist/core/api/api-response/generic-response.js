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
    return GenericResponse;
}());
exports.GenericResponse = GenericResponse;
