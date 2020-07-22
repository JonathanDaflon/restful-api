"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericService = void 0;
const data_access_1 = require("../data-access/data.access");
class GenericService {
    constructor(model) {
        this.model = model;
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            let document = yield this.genericDataAccess.findAll();
            return document;
        });
        this.findByID = (_id) => __awaiter(this, void 0, void 0, function* () {
            let document = yield this.genericDataAccess.findByID(_id);
            return document;
        });
        this.newDocument = (document) => __awaiter(this, void 0, void 0, function* () {
            document = yield this.genericDataAccess.create(document);
            return document;
        });
        this.overwriteDocument = (_id, document) => __awaiter(this, void 0, void 0, function* () {
            document = yield this.genericDataAccess.overwrite(_id, document);
            return document;
        });
        this.updateDocument = (_id, document) => __awaiter(this, void 0, void 0, function* () {
            document = yield this.genericDataAccess.update(_id, document);
            return document;
        });
        this.deleteDocument = (document) => __awaiter(this, void 0, void 0, function* () {
            yield this.genericDataAccess.delete({ _id: document });
        });
        this.genericDataAccess = new data_access_1.GenericDataAccess(model);
    }
}
exports.GenericService = GenericService;
