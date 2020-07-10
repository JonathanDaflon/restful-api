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
class GenericService {
    constructor(model) {
        this.model = model;
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            let document = yield this.model.find();
            return document;
        });
        this.findByID = (_id) => __awaiter(this, void 0, void 0, function* () {
            let document = yield this.model.findById({ _id });
            return document;
        });
        this.newDocument = (document) => __awaiter(this, void 0, void 0, function* () {
            document = new this.model(document);
            yield document.save();
            return document;
        });
        this.overwriteDocument = (_id, document) => __awaiter(this, void 0, void 0, function* () {
            const options = { runValidators: true, overwrite: true, new: true };
            document = yield this.model.findByIdAndUpdate(_id, document, options);
            return document;
        });
        this.updateDocument = (_id, document) => __awaiter(this, void 0, void 0, function* () {
            const options = { runValidators: true, new: true };
            document = yield this.model.findByIdAndUpdate(_id, document, options);
            return document;
        });
        this.deleteDocument = (document) => __awaiter(this, void 0, void 0, function* () {
            yield this.model.remove({ _id: document }).exec();
        });
    }
}
exports.GenericService = GenericService;
