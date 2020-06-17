import { Context, Next } from 'koa';
import { config } from '../../../config/api-config';


// A centralized Error Handler
class ErrorHandler {

    // Catch all errors thrown by ctx.throw then emit 'error' event
    async catcher(ctx: Context, next: Next) {

        try {
           return await next()
        
        } catch (err:any) {
           
            ctx.type = 'json'
            ctx.status = parseInt(err.status, 10) || ctx.status || 500
            ctx.app.emit('error', err, ctx)
        }
    }

    // Handler with a Switch/case for error messages
    async handler(err: any, ctx: Context) {

        let response = {}

        // Build response or do whatever you want depending on the type of error 
        switch (err.name) {
            
            default: {
              response = { message: err.message}
            }
            
            // A friendly error message for a MongoError exemple
            case 'MongoError': 
                if (err.message.startsWith('E11000')) {
                    ctx.status = 400
                    response = {
                        message: "esse email já está em uso"
                    }
                    break
                }
            
            // Here all the validations errors from Mongoose will be printed into a json object
            case 'ValidationError': 
            if (err.message.startsWith('User validation')) {
                ctx.status = 400
                const messages: any[] = []
                for(let name in err.errors){
                  messages.push({message: err.errors[name].message})
                }
                response = {
                    message: messages
                }
            break
            }
            
            // Implementar case autorização negada
          
        }
        // End processing by sending response
        ctx.body = response;


        if (config.koa.debug) {
            console.log('koa middleware - error ->')
            console.log(err)
        }
    }
    
}

export const errorHandler = new ErrorHandler()