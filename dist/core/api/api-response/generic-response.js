"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericResponse = void 0;
class GenericResponse {
    constructor(result, data) {
        this.result = false;
        this.data = undefined;
        this.result = result;
        this.data = data;
    }
    Data(data) {
        this.data = data;
    }
}
exports.GenericResponse = GenericResponse;
