"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
const generic_response_1 = require("./generic-response");
class ErrorResponse extends generic_response_1.GenericResponse {
    constructor(data, ctx) {
        super(false, data);
    }
}
exports.ErrorResponse = ErrorResponse;
