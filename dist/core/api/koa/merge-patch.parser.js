"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePatchBodyParser = void 0;
var mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = function (ctx, next) {
    if (ctx.request.type === mpContentType && ctx.request.method === 'PATCH') {
        try {
            console.log(ctx.request.toJSON());
            return next();
        }
        catch (e) {
            console.log(e.message);
            return next();
        }
    }
    return next();
};
