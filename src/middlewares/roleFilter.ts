import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import { UserRoles } from '../types/requestTypes';

export default (roles: (keyof typeof UserRoles)[]) => {
    return async (ctx: Context, next: Next) => {
        try {
            if (ctx.request.user === undefined) {
                return ctx.throw(401, "Token was not provided");
            }
    
            if (roles.includes(ctx.request.user.role) === false) {
                return ctx.throw(403, "Forbidden");
            }
    
            return next();
        } catch(e: any) {
            ctx.throw(e.status, e.message);
        }
    }
}