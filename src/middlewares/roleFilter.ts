import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { BadRequest, NotFound } from '../utils/response'

export default (role: string) => {
    return async (ctx: Context, next: Next) => {
        try {
            if (ctx.request.user === undefined) {
                return ctx.throw(401, "Token was not provided");
            }
    
            if (ctx.request.user.role !== role) {
                return ctx.throw(403, "Forbidden");
            }
    
            return next();
        } catch(e: any) {
            ctx.throw(e.status, e.message);
        }
    }
}