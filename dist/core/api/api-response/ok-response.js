"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OkResponse = void 0;
const generic_response_1 = require("./generic-response");
class OkResponse extends generic_response_1.GenericResponse {
    constructor(data) {
        super(true, data);
    }
}
exports.OkResponse = OkResponse;
