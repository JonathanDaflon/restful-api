import { Context, Next } from 'koa';
import { config } from '../../../config/api-config';
import { Error } from 'mongoose'
import { ErrorResponse } from './error-response';
import { MongoError } from 'mongodb';

class ErrorHandler {

    async catcher(ctx: Context, next: Next) {

        try {
            return await next()

        } catch (err) {
            ctx.status = 200;
            ctx.app.emit('error', err, ctx)
        }
    }

    async handler(err: Error, ctx: Context) {

        let response = new ErrorResponse(err.message, ctx)

        switch (err.name) {

            case 'MongoError':

                let mongoError = <MongoError>err
                if (mongoError.message.startsWith('E11000')) {
                    response.Data(mongoError.message);
                    break
                }

            case 'ValidationError':

                let validationError = <Error.ValidationError>err;

                if (err.message.startsWith('User validation')) {

                    if (Array.isArray(validationError.errors)) {
                        let messages: string[] = [];

                        for (let i = 0; i < validationError.errors.length; i++) {
                            messages.push(validationError.errors[i].message)
                        }
                        response.Data(messages)
                        break
                    }
                }

            //#region MyHeroException
            case 'MyHeroException':

                if (err.message == "Invalid Email") {
                    response.Data("Esse email não está cadastrado")
                    break
                }
            //#endregion

            case 'UnauthorizedError':

                if (err.message.startsWith('Authentication Error')) {
                    response.Data("Credenciais Inválidas")
                    break
                }

                if (err.message.startsWith('Unauthorized')) {
                    response.Data(err.message)
                    break

                }
        }

        ctx.body = response;

        if (config.koa.debug) {
            console.log('koa middleware - error ->')
            console.log(err)
        }
    }
}

export const errorHandler = new ErrorHandler()